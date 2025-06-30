import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@app/shared/contexts/hooks/useAuth';
import { supabase } from '@app/shared/lib/supabaseClient';
import RecipeTypes from '@app/shared/types/RecipeTypes';

async function fetchCollectionRecipes(collectionId: string): Promise<RecipeTypes[]> {
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
  const userId = useAuth().session?.user?.id;

  return (collectionId?: string, forceRefetch = false) => {
    if (collectionId) {
      // Invalidate specific collection
      queryClient.invalidateQueries({
        queryKey: ['collectionRecipes', collectionId, userId],
        refetchType: forceRefetch ? 'all' : 'inactive',
      });
    } else {
      // Invalidate all collection recipes
      queryClient.invalidateQueries({
        queryKey: ['collectionRecipes'],
        refetchType: forceRefetch ? 'all' : 'inactive',
      });
    }
  };
}
