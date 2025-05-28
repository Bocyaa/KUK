import HeaderButtonLink from '@app/components/ui/HeaderButtonLink';
import RecipeHeader from '@app/components/ui/recipes/RecipeHeader';
import SpinnerBar from '@app/components/ui/SpinnerBar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetUserProfile } from '@app/hooks/useGetUserProfile';
import { ChevronRight } from 'lucide-react';
import {
  restoreThemeColor,
  updateThemeColor,
} from '@app/utility/updateThemeColor';
import { formatCookTime } from '@app/utility/formatCookTime';
import { formatCreatedAt } from '@app/utility/formatCreatedAt';
import { useRecipeColor } from '@app/hooks/useRecipeColor';
import HeaderButtonIcon from '@app/components/ui/HeaderButtonIcon';
import { useGetRecipes } from '@app/hooks/useGetRecipes';
import BackSecondaryCard from '@app/components/ui/controllers/BackSecondaryCard';

function Recipe() {
  const { recipeId } = useParams<{ recipeId: string }>();

  const { data: recipes } = useGetRecipes();

  const recipe = recipes?.find((r) => r.id === recipeId);

  const {
    data: profile,
    isLoading: isLoadingProfile,
    error: errorProfile,
  } = useGetUserProfile();

  const { color: dominantColor } = useRecipeColor(
    recipe?.id,
    recipe?.image_url,
  );

  const navigate = useNavigate();

  useEffect(() => {
    // Set theme color immediately when dominantColor changes
    updateThemeColor(dominantColor);

    return () => {
      restoreThemeColor();
    };
  }, [dominantColor]);

  return (
    <div className="pb-24">
      {/*  */}
      <RecipeHeader dominantColor={dominantColor}>
        <>
          <button
            onClick={() => {
              restoreThemeColor();
              navigate('/recipes');
            }}
          >
            <HeaderButtonIcon
              icon="xmark"
              transparent={true}
              iconColor="#f2f2f7"
            />
          </button>

          <HeaderButtonLink
            to="/recipes"
            icon="ellipsis"
            transparent={true}
            iconColor="#f2f2f7"
          />
        </>
      </RecipeHeader>

      {/*  */}
      <div className="flex min-h-[calc(100vh/1.5)] flex-col">
        <div
          className="flex h-full flex-col items-center pt-20"
          style={{ backgroundColor: dominantColor }}
        >
          {/* Image */}
          <div className="w-[calc(100vw/1.2)] shadow-xl">
            {recipe.image_url && (
              <img
                src={recipe.image_url}
                alt={recipe.title + 'image'}
                className="rounded-2xl"
              />
            )}
          </div>

          {/* Title & Desc & Username & Info */}
          <div className="flex flex-col items-center gap-1 px-7 py-5">
            <h1 className="text-ios-gray6 line-clamp-2 text-ellipsis text-center text-xl font-bold">
              {recipe.title}
            </h1>

            <h2 className="text-ios-gray6 line-clamp-3 text-ellipsis text-center text-base">
              {recipe.description}
            </h2>

            {/* Skill, kcal, time */}
            <div className="mt-2 flex items-center gap-1 text-white/60">
              <span className="text-sm">{recipe.difficulty}</span>

              <span className="text-xs">•</span>

              <div className="flex items-baseline">
                <span className="text-sm">{recipe.calories}</span>
                <span className="pl-1 text-xs">kcal</span>
              </div>

              <span className="text-xs">•</span>

              <div className="flex items-baseline">
                <span className="text-sm">
                  {formatCookTime(recipe.cook_time)}
                </span>
              </div>
            </div>
          </div>

          {/* Panel */}
          <div className="mb-8 h-32 w-[calc(100vw/1.2)] rounded-3xl bg-white/20 px-4 py-2 shadow-lg">
            <div className="flex flex-col gap-3">
              {/* Text */}
              <div className="text-ios-gray6 flex flex-col gap-2">
                <span className="font-semibold">Categories</span>
                <span className="text-xs">
                  Created {formatCreatedAt(recipe.created_at)}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <div className="flex h-11 w-full items-center justify-center rounded-xl border border-[#e6e6e6]/20 bg-white/20 shadow-lg">
                  <span className="font-semibold text-white">Edit</span>
                </div>
                <div className="bg-ios-gray6 flex h-11 w-full items-center justify-center rounded-xl shadow-lg">
                  <span className="font-semibold">Cook</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* White Bg */}
      <div className="px-7 py-5">
        <h3 className="text-lg font-semibold">Ingredients</h3>
        <div>
          <BackSecondaryCard justify="start" height="full">
            <div className="flex w-full flex-col gap-1">
              {recipe.ingredients.map(
                (r, i) =>
                  // <IngredientRow
                  //   key={`${ing.id ?? ing.name}-${i}`}
                  //   ingredient={ing}
                  //   index={i}
                  //   onRemove={() => onRemove(i)}
                  //   onUpdateComment={onUpdateComment}
                  // />
                  r.name,
              )}
            </div>
          </BackSecondaryCard>
        </div>
      </div>
    </div>
  );
}

export default Recipe;

{
  /* 
[
  {
    "name": "Milk",
    "unit": "ml",
    "comment": "Fett 3,5%",
    "quantity": 250,
    "pricePerUnit": 1.09
  },
  {
    "name": "Flour",
    "unit": "g",
    "quantity": 140,
    "pricePerUnit": 0.59
  },
  {
    "name": "Boiling water",
    "unit": "ml",
    "quantity": 250
  },
  {
    "name": "Sunflower oil",
    "unit": "ml",
    "quantity": 20,
    "pricePerUnit": 1.49
  },
  {
    "name": "Baking powder",
    "unit": "tsp",
    "quantity": 0.5
  },
  {
    "name": "Egg",
    "unit": "pcs",
    "quantity": 3,
    "pricePerUnit": 0.2
  },
  {
    "name": "Sugar",
    "unit": "tbsp",
    "quantity": 2,
    "pricePerUnit": 0.89
  }
]
  */
}
