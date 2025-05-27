import HeaderButtonLink from '@app/components/ui/HeaderButtonLink';
import RecipeHeader from '@app/components/ui/recipes/RecipeHeader';
import RecipeListCard from '@app/components/ui/recipes/RecipeListCard';
import { useGetRecipes } from '@app/hooks/useGetRecipes';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

function MyRecipesDetails() {
  const { data: recipes } = useGetRecipes();

  const sortedRecipes = recipes
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ) || [''];

  return (
    <div className="mt-20 h-screen">
      <RecipeHeader title="My Recipes" back={<Back />}>
        <HeaderButtonLink to="/create-recipe" icon="plus" />
      </RecipeHeader>

      <div className="flex flex-col gap-1 px-5">
        {sortedRecipes?.map((r) => <RecipeListCard recipe={r} />)}
      </div>
    </div>
  );
}

function Back() {
  return (
    <NavLink to="/recipes">
      <div className="flex items-center gap-1">
        <ChevronLeftIcon className="h-3 w-3" />
        <span className="text-xs text-[#0094f6]">Back to Recipes</span>
      </div>
    </NavLink>
  );
}

export default MyRecipesDetails;
