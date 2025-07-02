import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '@app/components/layout/Header';
import RecipeCardCarousel from '@app/components/recipes/RecipeCardCarousel';
import RecipeCard from '@app/components/recipes/RecipeCard';
import MyRecipes from '@app/components/recipes/MyRecipes';
import RecipeListCard from '@app/components/recipes/RecipeListCard';
import SpinnerBar from '@app/components/ui/SpinnerBar';
import RecipeTypes from '@app/shared/types/RecipeTypes';
import MyCollections from '@app/components/recipes/MyCollections';
import CollectionCard from '@app/components/recipes/CollectionCard';

import { useGetUserRecipes } from '@app/features/recipes/hooks/useGetUserRecipes';
import { getRandomRecipes, getSortedRecipes } from '@app/shared/utility/recipeUtils';
import { useGetCollectionsPreview } from '@app/features/collections/hooks/useGetCollectionsPreview';

function Recipes() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: recipesData, isFetching: isLoadingRecipes } = useGetUserRecipes();
  const { data: collectionsData } = useGetCollectionsPreview(); // isFetching: isLoadingCollections

  const recipes = recipesData as RecipeTypes[];
  const collections = collectionsData || [];

  const randomRecipes = useMemo(() => getRandomRecipes(recipes), [recipes]);
  const sortedRecipes = useMemo(() => getSortedRecipes(recipes), [recipes]);

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleCollectionClick = (collectionId: string) => {
    navigate(`/recipes/collection/${collectionId}`, {
      state: { from: location.pathname },
    });
  };

  if (isLoadingRecipes) return <Loading />;

  return (
    <div className="py-20 standalone:pb-24">
      <Header title="Recipes" />

      <RecipeCardCarousel>
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
      </RecipeCardCarousel>

      <MyRecipes>
        {sortedRecipes?.map((r, i) => (
          <RecipeListCard
            key={i}
            recipe={r}
            onClick={() => handleRecipeClick(r.id)}
          />
        ))}
      </MyRecipes>

      <MyCollections>
        {collections?.map((item, i) => (
          <CollectionCard
            key={i}
            collection={item}
            onClick={() => handleCollectionClick(item.id)}
          />
        ))}
      </MyCollections>
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

function Loading() {
  return (
    <div className="h-screen bg-white dark:bg-black">
      <Header title="Recipes" />

      <div className="pt-20">
        <RecipeCardCarousel>
          <LoadingRecipeBigCards />
        </RecipeCardCarousel>
      </div>

      <MyRecipes>
        <LoadingRecipeSmallCards />
      </MyRecipes>
    </div>
  );
}
