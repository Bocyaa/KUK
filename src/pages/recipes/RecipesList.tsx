import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, SquaresPlusIcon } from '@heroicons/react/24/outline';

import Header from '@app/components/layout/Header';
import RecipeListCard from '@app/components/recipes/RecipeListCard';
import PlaceholderCardAddLink from '@app/components/ui/PlaceholderCardAddLink';
import ActionOptions from '@app/components/ui/ActionOptions';

import RecipeTypes from '@app/types/RecipeTypes';
import { useGetRecipes } from '@app/hooks/recipes/useGetRecipes';
import { getSortedRecipes } from '@app/utility/recipeUtils';
import DoneBtn from '@app/components/ui/DoneBtn';
import MainContent from '@app/components/ui/MainContent';
import PageContainer from '@app/components/ui/PageContainer';
import SelectRecipeCardRect from '@app/components/collections/SelectRecipeCardRect';

function RecipesList() {
  const { data, isFetching } = useGetRecipes();
  const recipes = data as RecipeTypes[];
  const sortedRecipes = getSortedRecipes(recipes);

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
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
          <DoneBtn onClick={handleDoneButton} isLoading={false} />
        ) : (
          <ActionOptions actions={actions} />
        )}
      </Header>

      <MainContent>
        {isSelectMode ? (
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
          <>
            {sortedRecipes?.map((r) => (
              <RecipeListCard recipe={r} onClick={() => handleRecipeClick(r.id)} />
            ))}
            <PlaceholderCardAddLink to="/create-recipe" />
          </>
        )}
      </MainContent>
    </PageContainer>
  );
}

export default RecipesList;
