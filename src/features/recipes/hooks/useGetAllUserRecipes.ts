import { useQuery } from '@tanstack/react-query';
import { supabase } from '@app/shared/lib/supabaseClient';
import { useAuth } from '@app/shared/contexts/hooks/useAuth';
import RecipeTypes from '@app/shared/types/RecipeTypes';

async function fetchAllUserRecipes(userId: string): Promise<RecipeTypes[]> {
  // 1. Fetch user's own recipes
  const { data: ownRecipes, error: ownRecipesError } = await supabase
    .from('recipes')
    .select('*, owner:public_profiles!recipes_user_id_fkey(username, avatar_url)')
    .eq('user_id', userId);

  if (ownRecipesError) throw ownRecipesError;

  // 2. Find the 'Saved' collection
  const { data: savedCollection, error: collectionError } = await supabase
    .from('collections')
    .select('id')
    .eq('user_id', userId)
    .eq('name', 'Saved')
    .maybeSingle();

  if (collectionError) throw collectionError;

  let savedRecipes: RecipeTypes[] = [];
  if (savedCollection) {
    // 3. Get recipe IDs from 'Saved' collection
    const { data: recipeCollections, error: recipeCollectionsError } = await supabase
      .from('recipe_collections')
      .select('recipe_id')
      .eq('collection_id', savedCollection.id);

    if (recipeCollectionsError) throw recipeCollectionsError;

    if (recipeCollections && recipeCollections.length > 0) {
      const recipeIds = recipeCollections.map((rc) => rc.recipe_id);

      // 4. Fetch the saved recipes' details
      const { data: fetchedSavedRecipes, error: savedRecipesError } = await supabase
        .from('recipes')
        .select(
          '*, owner:public_profiles!recipes_user_id_fkey(username, avatar_url)',
        )
        .in('id', recipeIds);

      if (savedRecipesError) throw savedRecipesError;
      if (fetchedSavedRecipes) {
        savedRecipes = fetchedSavedRecipes as RecipeTypes[];
      }
    }
  }

  // 5. Combine and deduplicate
  const allRecipes = [...(ownRecipes || []), ...savedRecipes];
  const uniqueRecipes = Array.from(
    new Map(allRecipes.map((recipe) => [recipe.id, recipe])).values(),
  );

  return uniqueRecipes;
}

export function useGetAllUserRecipes() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: ['allUserRecipes', userId],
    queryFn: () => fetchAllUserRecipes(userId!),
    enabled: !!userId,
  });
}
