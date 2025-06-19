import Header from '@app/components/layout/Header';
import RecipeListCard from '@app/components/recipes/RecipeListCard';
import BackLink from '@app/components/ui/BackLink';
import HeaderButtonIcon from '@app/components/ui/HeaderButtonIcon';
import { useGetCollectionRecipes } from '@app/hooks/collections/useGetCollectionRecipes';
import { useGetCollectionsPreview } from '@app/hooks/collections/useGetCollectionsPreview';
import { useBackNavigation } from '@app/hooks/useBackNavigation';
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
    navigate(`/recipes/collection/${collectionId}/${recipeId}`);
  };

  const backLinkData = useBackNavigation({
    defaultTo: '/recipes/collections-list',
    defaultLabel: 'Back to Collections',
    routes: {
      '/recipes': {
        to: '/recipes',
        label: 'Back to Recipes',
      },
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen bg-white dark:bg-black">
        <Header
          title="Loading..."
          back={<BackLink to={backLinkData.to} label={backLinkData.label} />}
        />
      </div>
    );
  }

  return (
    <div className="h-screen bg-white dark:bg-black">
      <Header
        title={currentCollection?.name || 'Collection'}
        back={<BackLink to={backLinkData.to} label={backLinkData.label} />}
      >
        <HeaderButtonIcon icon="ellipsis" />
      </Header>

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
