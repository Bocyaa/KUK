import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  restoreThemeColor,
  updateThemeColor,
} from '@app/utility/updateThemeColor';
import { formatCookTime } from '@app/utility/formatCookTime';
import { formatCreatedAt } from '@app/utility/formatCreatedAt';
import { useRecipeColor } from '@app/hooks/useRecipeColor';
import BackSecondaryCard from '@app/components/ui/BackSecondaryCard';
import FrontPrimaryCard from '@app/components/ui/FrontPrimaryCard';
import QuantityStepper from '@app/components/ingredients/QuantityStepper';
import { useGetRecipe } from '@app/hooks/recipes/useGetRecipe';
import RecipeTypes from '@app/types/RecipeTypes';
import Avatar from '@app/components/settings/Avatar';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useGetPublicRecipe } from '@app/hooks/recipes/useGetPublicRecipe';
import RecipeHeader from '@app/components/recipe/RecipeHeader';

function Recipe() {
  const { recipeId } = useParams<{ recipeId: string }>();

  const { data: dataUser } = useGetRecipe(recipeId);
  const { data: publicData } = useGetPublicRecipe(recipeId);

  let recipe = dataUser as RecipeTypes;
  if (!recipe) {
    recipe = publicData as RecipeTypes;
  }

  const isNavigatingRef = useRef(false); // Track if component is being unmounted due to navigation
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
  const { color: dominantColor } = useRecipeColor(
    recipe?.id,
    recipe?.image_url,
  );

  // Set dominant color
  useEffect(() => {
    updateThemeColor(dominantColor);

    return () => {
      // Only restore theme color if we're actually navigating away, not during transition animations
      if (isNavigatingRef.current) {
        restoreThemeColor();
      }
    };
  }, [dominantColor]);

  return (
    <div className="no-scrollbar h-screen overflow-y-auto">
      <RecipeHeader dominantColor={dominantColor} />

      {/* Dominant Color */}
      <div className="flex w-full flex-col gap-3 pt-16">
        <div className="flex w-full items-center gap-3 px-2">
          <div>
            <Avatar src={recipe.owner.avatar_url} size={36} />
          </div>

          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-ios-gray6">
                {recipe.owner.username}
              </span>
              <span className="text-xs text-ios-gray5">
                {formatCreatedAt(recipe.created_at)}
              </span>
            </div>

            <div className="rounded-lg border border-ios-gray5/60 px-3 py-1">
              <span className="text-sm font-medium text-ios-gray5">Follow</span>
            </div>
          </div>
        </div>

        <div>
          {recipe.image_url && (
            <img src={recipe.image_url} alt={recipe.title + 'image'} />
          )}
        </div>

        <div
          className="flex h-full flex-col items-center"
          style={{ backgroundColor: dominantColor }}
        >
          <div className="flex w-full flex-col items-center px-7">
            <h1 className="line-clamp-2 text-ellipsis text-center text-2xl font-semibold text-ios-gray6">
              {recipe.title}
            </h1>

            <h2 className="line-clamp-2 text-ellipsis text-center text-base text-ios-gray6">
              {recipe.description}
            </h2>

            <div className="my-3 w-full border-b border-[#e3e3e3]/10"></div>

            <div className="flex items-center gap-1 text-[#e3e3e3]/90">
              <span className="rounded-xl bg-white/10 px-2.5 py-1">
                {recipe.difficulty}
              </span>

              <span className="text-xs">•</span>

              <div className="flex items-baseline rounded-xl bg-white/10 px-2.5 py-1">
                <span className="">{recipe.calories}</span>
                <span className="pl-1 text-xs">kcal</span>
              </div>

              <span className="text-xs">•</span>

              <span className="rounded-xl bg-white/10 px-2.5 py-1">
                {formatCookTime(recipe.cook_time)}
              </span>
            </div>

            <div className="my-3 w-full border-b border-[#e3e3e3]/10"></div>

            <div className="no-scrollbar flex w-full justify-center gap-1 overflow-x-auto px-2 text-[#e3e3e3]/90">
              {recipe.categories.length > 0 ? (
                <>
                  {recipe.categories.map((c, i) => (
                    <span
                      key={i}
                      className="rounded-xl border border-[#e6e6e6]/10 bg-white/10 px-2 py-1 backdrop-blur-md"
                    >
                      {c}
                    </span>
                  ))}
                  <span className="rounded-xl border border-dashed border-[#e6e6e6]/50 px-4 py-1">
                    +
                  </span>
                </>
              ) : (
                <div className="flex text-ios-gray6">
                  <span className="rounded-xl border border-dashed border-[#e6e6e6]/50 px-4 py-1 text-sm uppercase">
                    Add category +
                  </span>
                </div>
              )}
            </div>

            <div className="my-3 w-full border-b border-[#e3e3e3]/10"></div>

            <div className="mb-3 flex justify-center gap-3">
              <div className="flex items-center justify-center rounded-xl border border-[#e6e6e6]/20 bg-white/20 px-14 py-2 shadow-lg">
                <span className="font-semibold text-white">Edit</span>
              </div>

              <div className="flex items-center justify-center rounded-xl bg-ios-gray6 px-14 py-2 shadow-lg">
                <span className="font-semibold">Cook</span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-3 border bg-white py-2 pl-5 pr-5">
            <div className="flex flex-col justify-center pb-2">
              <HeartIcon className="h-9 w-9" />
              <span className="text-[0.7rem]">0 likes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-white p-6 px-7 pb-32 dark:bg-black">
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
                <span className="font-medium">
                  {totalAdjustedPrice.toFixed(2)}
                </span>
                <span className="font-light">€</span>
              </div>
            )}
          </FrontPrimaryCard>
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
                    <span className="px-3 font-light text-[#5d5d5d]">
                      {i + 1}
                    </span>

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

        <BackSecondaryCard className="mt-3">
          <span className="flex px-2 py-1 text-[#5d5d5d]">
            Number of portions:
          </span>
          <QuantityStepper value={portions} onChange={handlePortionChange} />
        </BackSecondaryCard>
      </div>
    </div>
  );
}

export default Recipe;
