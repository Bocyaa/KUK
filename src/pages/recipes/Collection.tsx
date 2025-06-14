import Header from '@app/components/layout/Header';
import RecipeListCard from '@app/components/recipes/RecipeListCard';
import BackLink from '@app/components/ui/BackLink';
import { useGetCollectionRecipes } from '@app/hooks/recipes/collections/useGetCollectionRecipes';
import { useGetCollectionsPreview } from '@app/hooks/recipes/collections/useGetCollectionsPreview';
import { useNavigate, useParams } from 'react-router-dom';

function Collection() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const { data: recipes, isLoading } = useGetCollectionRecipes(collectionId);
  const { data: collections } = useGetCollectionsPreview();

  const navigate = useNavigate();

  const currentCollection = collections?.find(
    (collection) => collection.id === collectionId,
  );

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-white dark:bg-black">
        <Header
          title="Loading..."
          back={<BackLink to="/recipes" label="Back to recipes" />}
        />
      </div>
    );
  }

  return (
    <div className="h-screen bg-white dark:bg-black">
      <Header
        title={currentCollection?.name || 'Collection'}
        back={<BackLink to="/recipes" label="Back to recipes" />}
      />

      <div className="flex flex-col gap-1 px-5 pb-24 pt-20">
        {recipes?.map((recipe) => (
          <RecipeListCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => handleRecipeClick(recipe.id)}
          />
        ))}

        {recipes?.length === 0 && (
          <p className="mt-10 text-center text-gray-500">
            No recipes in this collection yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Collection;
