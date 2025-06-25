/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import toast from 'react-hot-toast';

import { supabase } from '@app/lib/supabaseClient';
import { useAuth } from '@app/contexts/hooks/useAuth';
import { useInvalidateCollectionsPreview } from './useGetCollectionsPreview';
import { useInvalidateCollectionRecipes } from './useGetCollectionRecipes';

export function useUpdateCollection() {
  const { session } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const invalidateCollectionsPreview = useInvalidateCollectionsPreview();
  const invalidateCollectionRecipes = useInvalidateCollectionRecipes();

  const updateCollectionRecipes = async (
    collectionId: string,
    recipeIds: string[],
  ) => {
    if (!session?.user) {
      toast.error('You must be logged in.');
      return;
    }

    setIsUpdating(true);

    try {
      // 1. Delete all existing recipe associations for this collection
      const { error: deleteError } = await supabase
        .from('recipe_collections')
        .delete()
        .eq('collection_id', collectionId);

      if (deleteError) throw deleteError;

      // 2. Insert the new set of recipes if there are any
      if (recipeIds.length > 0) {
        const recordsToInsert = recipeIds.map((recipe_id) => ({
          collection_id: collectionId,
          recipe_id,
        }));

        const { error: insertError } = await supabase
          .from('recipe_collections')
          .insert(recordsToInsert);

        if (insertError) throw insertError;
      }

      // toast.success('Collection updated successfully!');

      // 3. Invalidate caches to refetch data
      invalidateCollectionsPreview();
      invalidateCollectionRecipes(collectionId, true);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update collection.');
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteCollection = async (collectionId: string) => {
    if (!session?.user) {
      toast.error('You must be logged in.');
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', collectionId);

      if (error) throw error;

      toast.success('Collection deleted.');
      invalidateCollectionsPreview();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete collection.');
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateCollectionRecipes, deleteCollection, isUpdating };
}
