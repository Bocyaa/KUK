import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CheckCircleIcon,
  ListBulletIcon,
  Squares2X2Icon,
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

import RecipeTypes from '@app/shared/types/RecipeTypes';
import { getSortedRecipes } from '@app/shared/utility/recipeUtils';
import { useGetRecipes } from '@app/features/recipes/hooks/useGetRecipes';
import { useDeleteRecipe } from '@app/features/recipes/hooks/useDeleteRecipe';
import { Search } from 'lucide-react';
import { truncateText } from '@app/shared/utility/truncateDescription';
import GridCol2 from '@app/components/ui/GridCol2';

function RecipesList() {
  const { data, isFetching } = useGetRecipes();
  const recipes = data as RecipeTypes[];
  const sortedRecipes = getSortedRecipes(recipes);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const [isListView, setIsListView] = useState(true);

  const { deleteRecipes, isDeleting } = useDeleteRecipe();

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

  const filteredRecipes = sortedRecipes?.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <PageContainer>
      <Header title="My Recipes" back="Recipes">
        {isSelectMode ? (
          <DoneBtn onClick={handleDoneButton} isLoading={isDeleting} />
        ) : (
          <div className="flex items-center gap-2">
            {isListView ? (
              <button
                onClick={() => setIsListView(!isListView)}
                className="h-7 w-7 bg-transparent text-[#0094f6] active:text-[#005994]"
              >
                <Squares2X2Icon />
              </button>
            ) : (
              <button
                onClick={() => setIsListView(!isListView)}
                className="h-7 w-7 bg-transparent text-[#0094f6] active:text-[#005994]"
              >
                <ListBulletIcon />
              </button>
            )}
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
            {/* Search Bar */}
            <div className="relative mb-3 flex w-full items-center overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                className={`w-full rounded-xl border border-[#e6e6e6] bg-[#f9f9f9] py-1 pl-7 pr-2 outline-none transition-all ease-in-out dark:border-transparent dark:bg-[#212121]`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
                <Search className="h-4 w-4 stroke-[2] text-[#afafaf]" />
              </span>
            </div>

            {isListView ? (
              <>
                {filteredRecipes?.map((r) => (
                  <RecipeListCard
                    key={r.id}
                    recipe={r}
                    onClick={() => handleRecipeClick(r.id)}
                  />
                ))}
                <PlaceholderCardAddLink to="/create-recipe" />
              </>
            ) : (
              <>
                <GridCol2>
                  {filteredRecipes?.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => handleRecipeClick(r.id)}
                      className="cursor-pointer rounded-lg border border-[#e6e6e6] shadow-sm dark:border-transparent"
                    >
                      {/* Image */}
                      <div className="h-32 w-full flex-shrink-0 rounded-t-lg bg-white p-2 dark:bg-[#212121]">
                        <img
                          src={r.image_url}
                          alt="Recipe image"
                          className="h-full w-full rounded-sm object-cover"
                        />
                      </div>

                      {/* Title & Description */}
                      <div className="flex items-center justify-between rounded-b-lg bg-white px-2 pb-2 dark:bg-[#212121]">
                        <h3 className="line-clamp-1 overflow-hidden text-ellipsis font-medium leading-5 text-[#0d0d0d] dark:text-[#ffffff]">
                          {truncateText(r.title, 6)}
                        </h3>
                      </div>
                    </div>
                  ))}
                </GridCol2>
              </>
            )}
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
