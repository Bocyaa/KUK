import { useEffect } from 'react';
import { useGetRecipes } from '@app/hooks/recipes/useGetRecipes';
import { colorExtractionService } from '@app/services/colorExtractionService';

export function ColorInitializer() {
  const { data: recipes } = useGetRecipes();

  useEffect(() => {
    if (recipes?.length) {
      colorExtractionService.initializeColors(recipes);
    }
  }, [recipes]);

  return null;
}
