import { useEffect } from 'react';
import { useGetRecipes } from '@app/hooks/recipes/useGetRecipes';
import { colorExtractionService } from '@app/services/colorExtractionService';
import { useGetPublicRecipes } from '@app/hooks/recipes/useGetPublicRecipes';

export function ColorInitializer() {
  const { data: recipes } = useGetRecipes();
  const { data: publicRecipes } = useGetPublicRecipes();

  useEffect(() => {
    const allRecipes = [...(recipes || []), ...(publicRecipes || [])];

    if (allRecipes?.length) {
      colorExtractionService.initializeColors(allRecipes);
    }
  }, [recipes, publicRecipes]);

  return null;
}
