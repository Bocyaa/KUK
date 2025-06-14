import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@app/contexts/hooks/useAuth';
import { supabase } from '@app/lib/supabaseClient';
import RecipeTypes from '@app/types/RecipeTypes';

async function fetchCollectionRecipes(
  collectionId: string,
): Promise<RecipeTypes[]> {
  // First, get all recipe IDs in this collection
  const { data: recipeCollections, error: collectionError } = await supabase
    .from('recipe_collections')
    .select('recipe_id')
    .eq('collection_id', collectionId);

  if (collectionError) throw collectionError;

  if (!recipeCollections || recipeCollections.length === 0) {
    return [];
  }

  const recipeIds = recipeCollections.map((rc) => rc.recipe_id);

  // Then, fetch all recipes with their details
  const { data: recipes, error: recipesError } = await supabase
    .from('recipes')
    .select(
      `
      id,
      user_id,
      title,
      description,
      difficulty,
      calories,
      portions,
      cook_time,
      price,
      categories,
      image_url,
      created_at,
      ingredients,
      owner:public_profiles!recipes_user_id_fkey(
        username,
        avatar_url
      )
    `,
    )
    .in('id', recipeIds);

  if (recipesError) throw recipesError;

  // Transform the data to match RecipeTypes structure
  return (
    recipes?.map(
      (recipe): RecipeTypes => ({
        id: recipe.id,
        user_id: recipe.user_id,
        title: recipe.title,
        description: recipe.description,
        difficulty: recipe.difficulty,
        calories: recipe.calories,
        portions: recipe.portions,
        cook_time: recipe.cook_time,
        price: recipe.price,
        categories: recipe.categories || [],
        image_url: recipe.image_url,
        created_at: recipe.created_at,
        ingredients: recipe.ingredients || [],
        owner: {
          username: recipe.owner?.username || '',
          avatar_url: recipe.owner?.avatar_url || '',
        },
      }),
    ) || []
  );
}

// Returns all recipes in a specific collection with infinite cache
export function useGetCollectionRecipes(collectionId: string | undefined) {
  const userId = useAuth().session?.user?.id;

  return useQuery({
    queryKey: ['collectionRecipes', collectionId, userId],
    queryFn: () => fetchCollectionRecipes(collectionId!),
    enabled: !!collectionId && !!userId,
    staleTime: Infinity, // Cache forever
    gcTime: Infinity, // Keep in cache forever
  });
}

// Helper to invalidate collection recipes cache
export function useInvalidateCollectionRecipes() {
  const queryClient = useQueryClient();

  return (collectionId?: string) => {
    if (collectionId) {
      // Invalidate specific collection
      queryClient.invalidateQueries({
        queryKey: ['collectionRecipes', collectionId],
      });
    } else {
      // Invalidate all collection recipes
      queryClient.invalidateQueries({
        queryKey: ['collectionRecipes'],
      });
    }
  };
}

/**
 * Fetches recipe IDs first from the recipe_collections junction table.
 * Then fetches all recipe details using the collected IDs with .in('id', recipeIds).
 * Works with mixed collections containing both user-owned and public recipes.
 * Properly types the response to match your RecipeTypes interface exactly.
 * Handles empty collections by returning an empty array.
 * Maintains infinite caching as requested.
 * Provides proper null safety for optional fields like image_url, categories, ingredients, and owner data.
 */
