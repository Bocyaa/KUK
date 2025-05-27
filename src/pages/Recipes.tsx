import RecipeHeader from '@app/components/ui/recipes/RecipeHeader';
import RecipeCardCarousel from '@app/components/ui/recipes/RecipeCardCarousel';
import RecipeCard from '@app/components/ui/recipes/RecipeCard';
import MyRecipes from '@app/components/ui/recipes/MyRecipes';
import RecipeListCard from '@app/components/ui/recipes/RecipeListCard';
import SpinnerBar from '@app/components/ui/SpinnerBar';

import { useGetRecipes } from '@app/hooks/useGetRecipes';

import HeaderButtonLink from '@app/components/ui/HeaderButtonLink';
import { useNavigate } from 'react-router-dom';

function Recipes() {
  const { data: recipes, isLoading: isLoadingRecipes } = useGetRecipes();
  const navigate = useNavigate();

  const randomRecipes = recipes
    ? [...recipes].sort(() => Math.random() - 0.5)
    : [];

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
    <div className="mb-12 h-screen">
      <RecipeHeader title="Recipes">
        <div className="flex gap-2">
          <HeaderButtonLink to="my-recipes-list" icon="list" />
          <HeaderButtonLink to="create-recipe" icon="plus" />
        </div>
      </RecipeHeader>

      <div className="mt-20">
        <RecipeCardCarousel>
          {isLoadingRecipes ? (
            <SpinnerBar />
          ) : (
            <>
              {randomRecipes?.map((r, i) => (
                <RecipeCard
                  key={i}
                  username="fazi"
                  title={r.title}
                  description={r.description}
                  img={r.image_url}
                  price={r.price}
                  onClick={() => handleRecipeClick(r.id)}
                />
              ))}
            </>
          )}
        </RecipeCardCarousel>

        {isLoadingRecipes ? (
          <MyRecipes>
            <SpinnerBar />
          </MyRecipes>
        ) : (
          <>
            <MyRecipes>
              {sortedRecipes?.map((r, i) => (
                <RecipeListCard key={i} recipe={r} />
              ))}
            </MyRecipes>
          </>
        )}
      </div>
    </div>
  );
}

export default Recipes;
