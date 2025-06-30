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

import { useGetAllUserRecipes } from '@app/features/recipes/hooks/useGetAllUserRecipes';
import { useState } from 'react';
import SelectRecipeCardRect from '@app/components/collections/SelectRecipeCardRect';

import PlaceholderCardAddButton from '@app/components/ui/PlaceholderCardAddButton';
import DoneBtn from '@app/components/ui/DoneBtn';
import MainContent from '@app/components/ui/MainContent';
import MainContentEmpty from '@app/components/ui/MainContentEmpty';
import BottomActionPanel from '@app/components/ui/BottomActionPanel';
import { useGetCollectionRecipes } from '../hooks/useGetCollectionRecipes';
import { useGetCollectionsPreview } from '../hooks/useGetCollectionsPreview';
import { useUpdateCollection } from '../hooks/useUpdateCollection';

function Collection() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const { data: recipes, isLoading } = useGetCollectionRecipes(collectionId);
  const { data: collections } = useGetCollectionsPreview();
  const navigate = useNavigate();

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const [addSelectedRecipes, setAddSelectedRecipes] = useState<string[]>([]);

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
      `Are you sure you want to remove ${selectedRecipes.length} recipes from "${currentCollection?.name}" collection? This action cannot be undone?`,
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

  // When 'Add Recipes' is clicked
  const handleAddRecipesClick = () => {
    setIsAddMode(true);
    // Pre-select recipes already in the collection
    setAddSelectedRecipes(recipes?.map((r) => r.id) || []);
  };

  // Toggle selection in add mode
  const handleAddRecipeToggle = (recipeId: string) => {
    setAddSelectedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId],
    );
  };

  // Save selected recipes to collection
  const handleAddRecipesDone = async () => {
    if (!collectionId) return;
    await updateCollectionRecipes(collectionId, addSelectedRecipes);
    setIsAddMode(false);
    setAddSelectedRecipes([]);
  };

  const actions = [
    {
      label: 'Add Recipes',
      icon: <SquaresPlusIcon className="h-5 w-5" />,
      onClick: handleAddRecipesClick,
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

  const actionsBottomPanel = [
    { action: 'move', onClick: () => {} },
    { action: 'send', onClick: () => {} },
    { action: 'delete', onClick: handleDeleteSelectedRecipes },
  ];

  if (isLoading) {
    return (
      <div className="h-screen bg-white dark:bg-black">
        <Header title="&nbsp;" back="Collections">
          <SpinnerBar />
        </Header>
      </div>
    );
  }

  // UI Specific functions and variables --------------------------------------
  const handleDoneButton = () => {
    if (isSelectMode) setIsSelectMode(false);
    if (isAddMode) handleAddRecipesDone();
  };

  const title = currentCollection?.name || 'Collection';
  // --------------------------------------------------------------------------

  return (
    <PageContainer>
      <Header title={title} back="Collections">
        {isSelectMode || isAddMode ? (
          <DoneBtn
            onClick={handleDoneButton}
            isLoading={isLoading || isLoadingAllRecipes || isUpdating}
          />
        ) : (
          <ActionOptions actions={actions} />
        )}
      </Header>

      <MainContent>
        {isAddMode ? (
          <>
            {allUserRecipes?.map((recipe) => (
              <SelectRecipeCardRect
                key={recipe.id}
                recipe={recipe}
                selectedRecipes={addSelectedRecipes}
                handleRecipeToggle={handleAddRecipeToggle}
              />
            ))}
          </>
        ) : isSelectMode ? (
          <>
            {recipes?.map((recipe) => (
              <SelectRecipeCardRect
                key={recipe.id}
                recipe={recipe}
                selectedRecipes={selectedRecipes}
                handleRecipeToggle={handleRecipeToggle}
              />
            ))}
          </>
        ) : (
          // Default Mode
          <div className="flex flex-col gap-1">
            {recipes?.map((recipe) => (
              <RecipeListCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe.id)}
              />
            ))}

            <PlaceholderCardAddButton onClick={handleAddRecipesClick} />
          </div>
        )}

        {!isAddMode && recipes?.length === 0 && (
          <MainContentEmpty icon="bookmark" message="No saved recipes yet" />
        )}
      </MainContent>

      {isSelectMode && (
        <BottomActionPanel
          actions={actionsBottomPanel}
          selectedRecipes={selectedRecipes}
        />
      )}
    </PageContainer>
  );
}

export default Collection;
