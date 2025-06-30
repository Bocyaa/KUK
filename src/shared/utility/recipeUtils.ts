import RecipeTypes from '@app/shared/types/RecipeTypes';

export const getRandomRecipes = (recipes: RecipeTypes[] | undefined) => {
  return recipes ? [...recipes].sort(() => Math.random() - 0.5) : [];
};

export const getSortedRecipes = (recipes: RecipeTypes[] | undefined) => {
  return (
    recipes
      ?.slice()
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ) || []
  );
};
