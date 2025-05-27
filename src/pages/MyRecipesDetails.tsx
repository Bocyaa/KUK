import BackLink from '@app/components/ui/BackLink';
import HeaderButtonLink from '@app/components/ui/HeaderButtonLink';
import RecipeHeader from '@app/components/ui/recipes/RecipeHeader';
import RecipeListCard from '@app/components/ui/recipes/RecipeListCard';
import { useGetRecipes } from '@app/hooks/useGetRecipes';

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
      <RecipeHeader
        title="My Recipes"
        back={<BackLink to="/recipes" label="Back to recipes" />}
      >
        <HeaderButtonLink to="/create-recipe" icon="plus" />
      </RecipeHeader>

      <div className="flex flex-col gap-1 px-5">
        {sortedRecipes?.map((r) => <RecipeListCard recipe={r} />)}
      </div>
    </div>
  );
}

export default MyRecipesDetails;
