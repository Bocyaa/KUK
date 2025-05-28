import { useState, useEffect } from 'react';
import { colorExtractionService } from '@app/services/colorExtractionService';

export const useRecipeColor = (recipeId: string, imageUrl?: string) => {
  const [color, setColor] = useState<string>('#646464');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!recipeId) return;

    // Check if color is already cached
    if (colorExtractionService.hasColor(recipeId)) {
      setColor(colorExtractionService.getColor(recipeId));
      return;
    }

    // If not cached and we have an image URL, extract it
    if (imageUrl) {
      setIsLoading(true);
      colorExtractionService
        .updateRecipeColor(recipeId, imageUrl)
        .then((extractedColor) => {
          setColor(extractedColor);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [recipeId, imageUrl]);

  return { color, isLoading };
};
