import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';

import Header from '@app/components/layout/Header';
import RecipeListCard from '@app/components/recipes/RecipeListCard';
import PlaceholderCardAddLink from '@app/components/ui/PlaceholderCardAddLink';
import ActionOptions from '@app/components/ui/ActionOptions';
import DoneBtn from '@app/components/ui/DoneBtn';
import MainContent from '@app/components/ui/MainContent';
import PageContainer from '@app/components/ui/PageContainer';
import SelectRecipeCardRect from '@app/components/collections/SelectRecipeCardRect';
import BottomActionPanel from '@app/components/ui/BottomActionPanel';

import RecipeTypes from '@app/types/RecipeTypes';
import { getSortedRecipes } from '@app/utility/recipeUtils';
import { useGetRecipes } from '@app/hooks/recipes/useGetRecipes';
import { useDeleteRecipe } from '@app/hooks/recipes/useDeleteRecipe';

function RecipesList() {
  const { data, isFetching } = useGetRecipes();
  const { deleteRecipes, isDeleting } = useDeleteRecipe();

  const recipes = data as RecipeTypes[];
  const sortedRecipes = getSortedRecipes(recipes);

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRecipeClick = (recipeId: string) => {
    navigate(`${location.pathname}/${recipeId}`);
  };

  const handleCreateClick = () => {
    navigate('/create-recipe');
  };

  const handleDeleteSelectedRecipes = async () => {
    if (recipes.length === 0) return;

    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${selectedRecipes.length} recipes? This action cannot be undone!`,
    );

    if (!isConfirmed) return;

    // Delete selected recipes
    await deleteRecipes(selectedRecipes);

    setSelectedRecipes([]);
    setIsSelectMode(false);
  };

  const actions = [
    {
      label: 'Create Recipe',
      icon: <SquaresPlusIcon className="h-5 w-5" />,
      onClick: handleCreateClick,
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
  ];

  const actionsBottomPanel = [
    { action: 'move', onClick: () => {} },
    { action: 'send', onClick: () => {} },
    { action: 'delete', onClick: handleDeleteSelectedRecipes },
  ];

  const handleRecipeToggle = (recipeId: string) => {
    setSelectedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId],
    );
  };

  const handleDoneButton = () => {
    if (isSelectMode) setIsSelectMode(false);
  };

  if (isFetching) return 'Fetching ...';

  return (
    <PageContainer>
      <Header title="My Recipes" back="Recipes">
        {isSelectMode ? (
          <DoneBtn onClick={handleDoneButton} isLoading={isDeleting} />
        ) : (
          <div className="flex items-center gap-2">
            <MagnifyingGlassIcon className="h-7 w-7 text-[#0094f6]" />
            <ActionOptions actions={actions} />
          </div>
        )}
      </Header>

      <MainContent>
        {isSelectMode ? (
          <>
            {sortedRecipes?.map((recipe) => (
              <SelectRecipeCardRect
                key={recipe.id}
                recipe={recipe}
                selectedRecipes={selectedRecipes}
                handleRecipeToggle={handleRecipeToggle}
              />
            ))}
          </>
        ) : (
          <>
            {/* TODO: Search Bar */}
            {sortedRecipes?.map((r) => (
              <RecipeListCard recipe={r} onClick={() => handleRecipeClick(r.id)} />
            ))}
            <PlaceholderCardAddLink to="/create-recipe" />
          </>
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

export default RecipesList;
