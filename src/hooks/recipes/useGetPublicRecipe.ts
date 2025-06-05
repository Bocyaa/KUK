import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@app/contexts/hooks/useAuth';
import RecipeTypes from '@app/types/RecipeTypes';

export function useGetPublicRecipe(recipeId: string | undefined) {
  const queryClient = useQueryClient();

  const recipes = queryClient.getQueryData(['publicRecipes', useAuth().session?.user?.id]) as RecipeTypes[];
  const recipe = recipes?.find((r) => r.id === recipeId);

  return {
    data: recipe,
    isLoading: !recipes,
    isFound: !!recipe,
  };
}
