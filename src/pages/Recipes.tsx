import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@app/components/recipes/Header';
import RecipeCardCarousel from '@app/components/recipes/RecipeCardCarousel';
import RecipeCard from '@app/components/recipes/RecipeCard';
import MyRecipes from '@app/components/recipes/MyRecipes';
import RecipeListCard from '@app/components/recipes/RecipeListCard';
import SpinnerBar from '@app/components/ui/SpinnerBar';
import HeaderButtonLink from '@app/components/ui/HeaderButtonLink';
import RecipeTypes from '@app/types/RecipeTypes';

import { useGetRecipes } from '@app/hooks/recipes/useGetRecipes';
import { getRandomRecipes, getSortedRecipes } from '@app/utility/recipeUtils';
// import { useGetUserById } from '@app/hooks/useGetUserById';

function Recipes() {
  const navigate = useNavigate();

  const { data, isFetching: isLoadingRecipes } = useGetRecipes();
  const recipes = data as RecipeTypes[];

  const randomRecipes = useMemo(() => getRandomRecipes(recipes), [recipes]);
  const sortedRecipes = useMemo(() => getSortedRecipes(recipes), [recipes]);

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div className="mb-12 h-screen bg-white dark:bg-black">
      <Header title="Recipes">
        <div className="flex gap-2">
          <HeaderButtonLink to="my-recipes-list" icon="list" />
          <HeaderButtonLink to="create-recipe" icon="plus" />
        </div>
      </Header>

      <div className="pt-20">
        <RecipeCardCarousel>
          {!isLoadingRecipes ? (
            <>
              {randomRecipes?.map((r, i) => (
                <RecipeCard
                  key={i}
                  username={r.owner.username}
                  title={r.title}
                  description={r.description}
                  img={r.image_url}
                  price={r.price}
                  onClick={() => handleRecipeClick(r.id)}
                />
              ))}
            </>
          ) : (
            <LoadingRecipeBigCards />
          )}
        </RecipeCardCarousel>

        {!isLoadingRecipes ? (
          <MyRecipes>
            {sortedRecipes?.map((r, i) => (
              <RecipeListCard
                key={i}
                recipe={r}
                onClick={() => handleRecipeClick(r.id)}
              />
            ))}
          </MyRecipes>
        ) : (
          <MyRecipes>
            <LoadingRecipeSmallCards />
          </MyRecipes>
        )}
      </div>
    </div>
  );
}

export default Recipes;

function LoadingRecipeBigCards() {
  return (
    <div className="flex w-[22rem] flex-shrink-0 snap-center flex-col gap-2">
      <div className="flex rounded-xl border-2 border-dashed py-5">
        <SpinnerBar />
      </div>

      <div className="flex h-56 w-[22rem] items-center rounded-xl border-2 border-dashed">
        <SpinnerBar />
      </div>
    </div>
  );
}

function LoadingRecipeSmallCards() {
  return (
    <>
      <div className="flex h-16 items-center rounded-lg border-2 border-dashed">
        <SpinnerBar />
      </div>

      <div className="flex h-16 items-center rounded-lg border-2 border-dashed">
        <SpinnerBar />
      </div>

      <div className="flex h-16 items-center rounded-lg border-2 border-dashed">
        <SpinnerBar />
      </div>
    </>
  );
}
