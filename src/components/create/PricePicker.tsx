import Ingredient from '@app/shared/types/IngredientTypes';
import BackSecondaryCard from '../ui/BackSecondaryCard';
import FrontPrimaryCard from '../ui/FrontPrimaryCard';
import FormSection from '../form/FormSection';
import { useEffect, useMemo, useState } from 'react';
import LabelPlaceholder from './LabelPlaceholder';
import PriceStepper from '@app/components/ingredients/PriceStepper';
import { UNIT_TO_KG, UNIT_TO_L } from '@app/shared/utility/calculateTotalPrice';
import HelperText from './HelperText';

type PricePickerProps = {
  form: {
    ingredients: Ingredient[];
    categories: string[];
    price: number;
    isPrivate: boolean;
  };
  updateForm: (fields: Partial<PricePickerProps['form']>) => void;
};

function PricePicker({ form, updateForm }: PricePickerProps) {
  const [ingredients, setIngredients] = useState(form.ingredients);

  // Calculate total price with proper unit conversions
  const totalPrice = useMemo(() => {
    let total = 0;

    for (const ing of ingredients) {
      const pricePerUnit = ing.pricePerUnit || 0;

      // Pieces: price is per piece
      if (ing.unit === 'pcs') {
        total += ing.quantity * pricePerUnit;
      }
      // Solid ingredients (by weight)
      else if (UNIT_TO_KG[ing.unit]) {
        const kg = ing.quantity * UNIT_TO_KG[ing.unit];
        total += kg * pricePerUnit;
      }
      // Liquid ingredients (by volume)
      else if (UNIT_TO_L[ing.unit]) {
        const l = ing.quantity * UNIT_TO_L[ing.unit];
        total += l * pricePerUnit;
      }
      // else: ignore unknown units
    }

    return (Math.round(total * 100) / 100).toFixed(2);
  }, [ingredients]);

  function handlePriceChange(ing: string, val: number) {
    // Update the local ingredients state with new price
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.name === ing ? { ...ingredient, pricePerUnit: val } : ingredient,
    );

    setIngredients(updatedIngredients);

    // Update the form with updated ingredients
    updateForm({ ingredients: updatedIngredients });

    // Also update the overall price in the form
    updateForm({ price: Number(calculateTotalPrice(updatedIngredients)) });
  }

  // Calculate total price for any ingredient array (helper function)
  function calculateTotalPrice(ingredients: Ingredient[]): string {
    let total = 0;

    for (const ing of ingredients) {
      const pricePerUnit = ing.pricePerUnit || 0;

      if (ing.unit === 'pcs') {
        total += ing.quantity * pricePerUnit;
      } else if (UNIT_TO_KG[ing.unit]) {
        const kg = ing.quantity * UNIT_TO_KG[ing.unit];
        total += kg * pricePerUnit;
      } else if (UNIT_TO_L[ing.unit]) {
        const l = ing.quantity * UNIT_TO_L[ing.unit];
        total += l * pricePerUnit;
      }
    }

    return (Math.round(total * 100) / 100).toFixed(2);
  }

  // Sync with form.ingredients when they change externally
  useEffect(() => {
    if (JSON.stringify(ingredients) !== JSON.stringify(form.ingredients)) {
      setIngredients(form.ingredients);
    }
  }, [form.ingredients]);

  function ingAmount(unit: string) {
    if (['g', 'kg', 'tbsp', 'tsp'].includes(unit)) {
      return (
        <>
          <span className="font-medium">1</span>
          <span className="text-sm text-[#0094f6]">kg</span>{' '}
        </>
      );
    } else if (unit === 'pcs') {
      return (
        <>
          <span className="font-medium">1</span>
          <span className="text-sm text-[#0094f6]">pcs</span>{' '}
        </>
      );
    } else {
      return (
        <>
          <span className="font-medium">1</span>
          <span className="text-sm text-[#0094f6]">𝓁</span>{' '}
        </>
      );
    }
  }

  return (
    <FormSection>
      {form.ingredients.length > 0 && (
        <>
          <div className="flex items-end gap-2 pl-1">
            <span className="text-xs font-normal uppercase tracking-wide text-[#5d5d5d] dark:text-[#afafaf]">
              Total cost:
            </span>
            <span className="text-xs font-semibold text-[#5d5d5d] dark:text-[#afafaf]">
              {totalPrice}
            </span>
            <span className="text-xs text-[#5d5d5d] dark:text-[#afafaf]">€</span>
          </div>
          <div className="mx-1 mb-4 mt-2 border-b dark:border-[#424242]"></div>
        </>
      )}
      <BackSecondaryCard justify="start" height="full">
        {ingredients.length > 0 ? (
          <div className="flex w-full flex-col gap-1">
            {/*  */}
            {ingredients.map((ing) => (
              <div className="w-full border-b border-[#e6e6e6] pb-2 pt-1 first:pt-0 last:border-none last:pb-0 dark:border-[#303030]">
                <div className="relative">
                  <div className="no-scrollbar overflow-x-auto" key={ing.name}>
                    <div className="flex min-w-max gap-1 whitespace-nowrap">
                      <FrontPrimaryCard className="mr-28 py-1">
                        <span className="px-2">
                          {ingAmount(ing.unit)}
                          <span className="text-sm font-light text-[#5d5d5d] dark:text-[#afafaf]">
                            of{' '}
                          </span>
                          <span className="font-medium capitalize">{ing.name}</span>
                        </span>
                      </FrontPrimaryCard>
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-0 top-0">
                    <PriceStepper
                      incVal={0.5}
                      decVal={0.5}
                      value={ing.pricePerUnit || 0}
                      onChange={(value) => handlePriceChange(ing.name, value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            {/*  */}
          </div>
        ) : (
          <LabelPlaceholder>Add some ingredients</LabelPlaceholder>
        )}
      </BackSecondaryCard>
      {form.ingredients.length > 0 && (
        <div className="mt-3">
          <HelperText
            text="Prices are applied to an actual amount of ingredients."
            marginBottom="mb-0"
          />
        </div>
      )}
    </FormSection>
  );
}

export default PricePicker;
