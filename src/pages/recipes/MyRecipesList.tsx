import BackLink from '@app/components/ui/BackLink';
import HeaderButtonLink from '@app/components/ui/HeaderButtonLink';
import Header from '@app/components/layout/Header';
import RecipeListCard from '@app/components/recipes/RecipeListCard';
import RecipeTypes from '@app/types/RecipeTypes';
import { useNavigate } from 'react-router-dom';

import { useGetRecipes } from '@app/hooks/recipes/useGetRecipes';

function MyRecipesList() {
  const { data } = useGetRecipes(); // isFetching
  const recipes = data as RecipeTypes[];
  const navigate = useNavigate();

  const sortedRecipes = recipes
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ) || [''];

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div className="pb-24 pt-20">
      <Header
        title="My Recipes"
        back={<BackLink to="/recipes" label="Back to recipes" />}
      >
        <HeaderButtonLink to="/create-recipe" icon="plus" />
      </Header>

      <div className="flex flex-col gap-1 px-5">
        {sortedRecipes?.map((r) => (
          <RecipeListCard recipe={r} onClick={() => handleRecipeClick(r.id)} />
        ))}
      </div>
    </div>
  );
}

export default MyRecipesList;
