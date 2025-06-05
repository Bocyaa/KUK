import Ingredient from '@app/types/IngredientTypes';

// Most accurate static values for average ingredient
const GRAMS_PER_TSP = 4.92892159375;
const GRAMS_PER_TBSP = GRAMS_PER_TSP * 3; // 14.78676478125

// Conversion factors for units to kg or l
export const UNIT_TO_KG: Record<string, number> = {
  g: 1 / 1000,
  kg: 1,
  tbsp: GRAMS_PER_TBSP / 1000, // ≈ 0.01479
  tsp: GRAMS_PER_TSP / 1000, // ≈ 0.00493
};

export const UNIT_TO_L: Record<string, number> = {
  ml: 1 / 1000,
  '𝓁': 1,
};

/**
 * Calculates the total price of a recipe based on ingredient quantities and prices.
 * @param ingredients List of ingredients with their quantities and prices
 * @returns Total price rounded to 2 decimal places
 */
export function calculateTotalPrice(ingredients: Ingredient[]): number {
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
    
  }

  return Math.round(total * 100) / 100; // round to 2 decimals
}
