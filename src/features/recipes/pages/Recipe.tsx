import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import {
  updateThemeColor,
  restoreThemeColor,
} from '@app/shared/utility/updateThemeColor';

import BackSecondaryCard from '@app/components/ui/BackSecondaryCard';
import FrontPrimaryCard from '@app/components/ui/FrontPrimaryCard';
import QuantityStepper from '@app/components/ingredients/QuantityStepper';
import RecipeTopNav from '@app/components/recipe/RecipeTopNav';
import RecipeImageCard from '@app/components/recipe/RecipeImageCard';
import SectionMain from '@app/components/recipe/SectionMain';
import SpinnerBar from '@app/components/ui/SpinnerBar';

import { useRecipeColor } from '@app/shared/hooks/useRecipeColor';
import { useSaveRecipe } from '@app/features/recipes/hooks/useSaveRecipe';
import { useGetRecipeById } from '@app/features/recipes/hooks/useGetRecipeById';
import RecipeTypes from '@app/shared/types/RecipeTypes';

function Recipe() {
  const { recipeId } = useParams<{ recipeId: string }>();

  const { data, isLoading } = useGetRecipeById(recipeId);
  const recipe: RecipeTypes = data;

  const [portions, setPortions] = useState(recipe?.portions || 1);

  // Store original ingredient amounts
  const originalIngredients = useMemo(() => {
    return (
      recipe?.ingredients?.map((ing) => ({
        ...ing,
        originalQuantity: ing.quantity || 0,
        originalPricePerUnit: ing.pricePerUnit || 0,
      })) || []
    );
  }, [recipe?.ingredients]);

  // Calculate adjusted ingredients based on current portions
  const adjustedIngredients = useMemo(() => {
    if (!recipe?.portions) return originalIngredients;

    const ratio = portions / recipe.portions;
    return originalIngredients.map((ing) => ({
      ...ing,
      quantity: Math.round(ing.originalQuantity * ratio * 100) / 100, // Round to 2 decimal places
    }));
  }, [originalIngredients, portions, recipe?.portions]);

  // Calculate total adjusted price based on recipe total price
  const totalAdjustedPrice = useMemo(() => {
    if (!recipe?.price || !recipe?.portions) return 0;

    const pricePerPortion = recipe.price / recipe.portions;
    return pricePerPortion * portions;
  }, [recipe?.price, recipe?.portions, portions]);

  // Handle portion change
  function handlePortionChange(newPortions: number) {
    setPortions(newPortions);
  }

  // Get dominant color
  const { color: dominantColor } = useRecipeColor(recipe?.id, recipe?.image_url);

  // Get status of the recipe if it is already saved by the user
  const { isSaved, toggleSave } = useSaveRecipe(recipe?.id);

  // Set/Reset dominant color
  useEffect(() => {
    updateThemeColor(dominantColor); // on mount & when colour finishes loading

    return () => {
      restoreThemeColor(); // on unmount
    };
  }, [dominantColor]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <span>Loading</span>
        <SpinnerBar height={2} width={100} />
      </div>
    );
  }

  return (
    <div className="no-scrollbar overflow-y-auto">
      <RecipeTopNav dominantColor={dominantColor} />

      <SectionMain>
        <RecipeImageCard
          recipe={recipe}
          isSaved={isSaved}
          onBookmarkToggle={toggleSave}
        />
      </SectionMain>

      {/* Section 2 */}
      <div className="-translate-y-5 rounded-t-3xl bg-[#f4f2ee] p-6 px-7 pb-32 dark:bg-black">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Ingredients</h3>
        </div>

        <BackSecondaryCard className="mb-3">
          <span className="flex px-2 py-1 text-[#5d5d5d]">
            Total price of ingredients:
          </span>
          <FrontPrimaryCard>
            {totalAdjustedPrice > 0 && (
              <div className="flex gap-1 px-2 py-1">
                <span className="font-medium">{totalAdjustedPrice.toFixed(2)}</span>
                <span className="font-light">€</span>
              </div>
            )}
          </FrontPrimaryCard>
        </BackSecondaryCard>

        <BackSecondaryCard className="mb-3">
          <span className="flex px-2 py-1 text-[#5d5d5d]">Number of portions:</span>
          <QuantityStepper value={portions} onChange={handlePortionChange} />
        </BackSecondaryCard>

        <BackSecondaryCard height="full">
          {adjustedIngredients.length > 0 ? (
            <div className="flex w-full flex-col gap-1">
              {adjustedIngredients.map((ing, i) => (
                <div
                  key={i}
                  className="no-scrollbar flex w-full items-center justify-between overflow-x-auto border-b border-[#f1f1f1] pb-1 last:border-none last:pb-0 dark:border-transparent"
                >
                  <div className="py-1">
                    <span className="px-3 font-light text-[#5d5d5d]">{i + 1}</span>

                    <span className="px-3 capitalize">{ing.name}</span>
                  </div>

                  <div className="mx-3 flex gap-3">
                    <span className="w-7 text-right">
                      {String(ing.quantity).replace('.', ',')}
                    </span>

                    <span className="w-7 text-left font-light text-[#5d5d5d]">
                      {ing.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="m-1 flex rounded-lg border border-dashed border-[#5d5d5d] px-2 py-2 text-[#5d5d5d]">
              <span className="text-sm uppercase">Add Ingredient +</span>
            </div>
          )}
        </BackSecondaryCard>
      </div>
    </div>
  );
}

export default Recipe;
