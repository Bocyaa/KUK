import { useNavigate, useParams } from 'react-router-dom';

import {
  CheckCircleIcon,
  SquaresPlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import PageContainer from '@app/components/ui/PageContainer';
import Header from '@app/components/layout/Header';
import RecipeListCard from '@app/components/recipes/RecipeListCard';
import ActionOptions from '@app/components/ui/ActionOptions';
import SpinnerBar from '@app/components/ui/SpinnerBar';
import { BookmarkIcon } from '@app/components/Icons/BookmarkIcon';

import { useGetCollectionRecipes } from '@app/hooks/collections/useGetCollectionRecipes';
import { useGetCollectionsPreview } from '@app/hooks/collections/useGetCollectionsPreview';
import { useUpdateCollection } from '@app/hooks/collections/useUpdateCollection';
import { useGetAllUserRecipes } from '@app/hooks/recipes/useGetAllUserRecipes';

function Collection() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const { data: recipes, isLoading } = useGetCollectionRecipes(collectionId);
  const { data: collections } = useGetCollectionsPreview();
  const navigate = useNavigate();

  const { updateCollectionRecipes, deleteCollection, isUpdating } =
    useUpdateCollection();
  const { data: allUserRecipes, isLoading: isLoadingAllRecipes } =
    useGetAllUserRecipes();

  const currentCollection = collections?.find(
    (collection) => collection.id === collectionId,
  );

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipes/collection/${collectionId}/${recipeId}`);
  };

  const handleDeleteCollection = async () => {
    if (!collectionId || !currentCollection) return;

    const isConfirmed = window.confirm(
      `Are you sure you want to delete the "${currentCollection.name}" collection? This action cannot be undone.`,
    );

    if (isConfirmed) {
      await deleteCollection(collectionId);
      navigate('/recipes/collections-list');
    }
  };

  /// Actions ///////////////////////////////////////////////////////////////////////////
  const actions = [
    {
      label: 'Add Recipes',
      icon: <SquaresPlusIcon className="h-5 w-5" />,
      onClick: () => {},
    },
    ...(recipes && recipes.length > 0
      ? [
          {
            label: 'Select Recipes',
            icon: <CheckCircleIcon className="h-5 w-5" />,
            onClick: () => {},
          },
        ]
      : []),
    ...(currentCollection?.name !== 'Saved'
      ? [
          {
            label: 'Delete Collection',
            icon: <TrashIcon className="h-5 w-5" />,
            onClick: handleDeleteCollection,
          },
        ]
      : []),
  ];
  //////////////////////////////////////////////////////////////////////////////////////

  const title = currentCollection?.name || 'Collection';

  if (isLoading) {
    return (
      <div className="h-screen bg-white dark:bg-black">
        <Header title="&nbsp;" back="Collections">
          <SpinnerBar />
        </Header>
      </div>
    );
  }

  return (
    <PageContainer>
      <Header title={title} back="Collections">
        <ActionOptions actions={actions} />
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
          <div className="flex h-screen flex-col items-center justify-center pb-40">
            <BookmarkIcon className="h-8 w-8 text-[#5d5d5d] dark:text-[#afafaf]" />
            <span className="mt-3 text-center text-[#5d5d5d] dark:text-[#afafaf]">
              No saved recipes yet
            </span>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default Collection;
