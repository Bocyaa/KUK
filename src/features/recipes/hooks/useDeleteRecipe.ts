import { useAuth } from '@app/shared/contexts/hooks/useAuth';
import { supabase } from '@app/shared/lib/supabaseClient';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function useDeleteRecipe() {
  // Get user to delete user own recipes
  const { session } = useAuth();
  // Get query client for invalidation
  const queryClient = useQueryClient();
  // Handle loading state
  const [isDeleting, setIsDeleting] = useState(false);

  // Delete Recipe(s)
  const deleteRecipes = async (recipeIds: string | string[]) => {
    // Get user ID
    const userId = session?.user?.id;
    // Return if user doesn't exists
    if (!userId) return;

    // If single ID, put it in an Array
    const idsToDelete = Array.isArray(recipeIds) ? recipeIds : [recipeIds];
    // Return if there is no a single ID in the array
    if (idsToDelete.length === 0) return;

    // Set loading state
    setIsDeleting(true);

    // Try to delete recipe(s) and catch errors and finally set loading state
    try {
      // Reach out supabase and delete recipe(s), also store an error
      const { error } = await supabase
        .from('recipes')
        .delete()
        .in('id', idsToDelete)
        .eq('user_id', userId);

      // Throw error if there is any
      if (error) throw error;

      // Show a success message to a user
      toast.success(
        `Successfully deleted ${idsToDelete.length} recipe${idsToDelete.length > 1 ? 's' : ''}`,
      );

      // Invalidate all queries related to recipes and collections
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['recipes'] }),
        queryClient.invalidateQueries({ queryKey: ['publicRecipes'] }),
        queryClient.invalidateQueries({ queryKey: ['allUserRecipes'] }),
        queryClient.invalidateQueries({ queryKey: ['collectionsPreview'] }),
        queryClient.invalidateQueries({ queryKey: ['collectionRecipes'] }),
      ]);
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Return delete function and loading state
  return { deleteRecipes, isDeleting };
}
