import HeaderButtonLink from '@app/components/ui/HeaderButtonLink';
import Header from '@app/components/layout/Header';
import RecipeListCard from '@app/components/recipes/RecipeListCard';
import RecipeTypes from '@app/types/RecipeTypes';
import { NavLink, useNavigate } from 'react-router-dom';

import { useGetRecipes } from '@app/hooks/recipes/useGetRecipes';
import { PlusIcon } from '@app/components/Icons/PlusIcon';
import { getSortedRecipes } from '@app/utility/recipeUtils';

function RecipesList() {
  const { data, isFetching } = useGetRecipes();
  const recipes = data as RecipeTypes[];
  const sortedRecipes = getSortedRecipes(recipes);

  const navigate = useNavigate();

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };

  if (isFetching) return 'Fetching ...';

  return (
    <div className="pb-24 pt-20">
      <Header title="My Recipes" back="Recipes">
        <HeaderButtonLink to="/create-recipe" icon="plus" />
      </Header>

      <div className="flex flex-col gap-1 px-5">
        {sortedRecipes?.map((r) => (
          <RecipeListCard recipe={r} onClick={() => handleRecipeClick(r.id)} />
        ))}
        <PlaceholderCardButton to="/create-recipe" />
      </div>
    </div>
  );
}

export default RecipesList;

function PlaceholderCardButton({ to }: { to: string }) {
  return (
    <NavLink to={to}>
      <div className="flex gap-3">
        <div className="flex h-16 w-20 items-center justify-center rounded-lg border-2 border-dashed shadow-sm active:bg-[#e0e0e0] dark:border-transparent dark:bg-[#212121] dark:active:bg-[#2c2c2c]">
          <PlusIcon />
        </div>
      </div>
    </NavLink>
  );
}
