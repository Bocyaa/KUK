import { useNavigate, useParams } from 'react-router-dom';

import {
  CheckCircleIcon,
  FolderIcon,
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
import { useState } from 'react';
import SelectRecipeCardRect from '@app/components/collections/SelectRecipeCardRect';
import { SendIcon } from 'lucide-react';

function Collection() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const { data: recipes, isLoading } = useGetCollectionRecipes(collectionId);
  const { data: collections } = useGetCollectionsPreview();
  const navigate = useNavigate();

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);

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

  const handleUpdateCollection = async () => {
    if (!collectionId) return;
    await updateCollectionRecipes(collectionId, selectedRecipes);
    setIsSelectMode(false);
  };

  const handleRecipeToggle = (recipeId: string) => {
    setSelectedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId],
    );
  };

  const handleDeleteSelectedRecipes = async () => {
    if (!collectionId || selectedRecipes.length === 0) return;

    const isConfirmed = window.confirm(
      `Are you sure you want to remove ${selectedRecipes.length} recipes from "${currentCollection?.name}" This action cannot be undone?`,
    );

    if (!isConfirmed) return;

    // Remove selected recipes from the collection
    const remainingRecipeIds =
      recipes
        ?.filter((recipes) => !selectedRecipes.includes(recipes.id))
        .map((recipes) => recipes.id) || [];

    await updateCollectionRecipes(collectionId, remainingRecipeIds);

    setSelectedRecipes([]);
    setIsSelectMode(false);
  };

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
            onClick: () => {
              setIsSelectMode(true);
              setSelectedRecipes([]);
            },
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
        {isSelectMode ? (
          <button
            className="text-lg font-semibold text-[#0094f6] active:text-[#005994]"
            onClick={() => setIsSelectMode(!isSelectMode)}
          >
            Done
          </button>
        ) : (
          <ActionOptions actions={actions} />
        )}
      </Header>

      <div className="flex flex-col justify-between gap-1 px-5 pb-24 pt-20">
        {isSelectMode ? (
          <>
            {recipes?.map((recipe) => (
              <SelectRecipeCardRect
                recipe={recipe}
                selectedRecipes={selectedRecipes}
                handleRecipeToggle={handleRecipeToggle}
              />
            ))}
          </>
        ) : (
          <>
            {recipes?.map((recipe) => (
              <RecipeListCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe.id)}
              />
            ))}
          </>
        )}

        {recipes?.length === 0 && (
          <div className="flex h-screen flex-col items-center justify-center pb-40">
            <BookmarkIcon className="h-8 w-8 text-[#5d5d5d] dark:text-[#afafaf]" />
            <span className="mt-3 text-center text-[#5d5d5d] dark:text-[#afafaf]">
              No saved recipes yet
            </span>
          </div>
        )}
      </div>

      {isSelectMode && (
        <div className="fixed inset-x-0 bottom-0 z-10 flex h-24 w-full items-center justify-evenly border-t bg-white pb-6 dark:border-[#39333c] dark:bg-black">
          {selectedRecipes.length > 0 ? (
            <>
              <FolderIcon className="h-7 w-7 text-[#0094f6] active:text-[#005994]" />
              <SendIcon className="h-7 w-7 text-[#0094f6] active:text-[#005994]" />
              <TrashIcon
                className="h-7 w-7 text-red-600"
                onClick={handleDeleteSelectedRecipes}
              />
            </>
          ) : (
            <>
              <FolderIcon className="h-7 w-7 text-[#5d5d5d] dark:text-[#5d5d5d]" />
              <SendIcon className="h-7 w-7 text-[#5d5d5d] dark:text-[#5d5d5d]" />
              <TrashIcon className="h-7 w-7 text-[#5d5d5d] dark:text-[#5d5d5d]" />
            </>
          )}
        </div>
      )}
    </PageContainer>
  );
}

export default Collection;
