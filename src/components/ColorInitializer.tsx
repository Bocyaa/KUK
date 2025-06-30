import { useEffect } from 'react';
import { useGetRecipes } from '@app/features/recipes/hooks/useGetRecipes';
import { colorExtractionService } from '@app/shared/utility/colorExtractionService';
import { useGetPublicRecipes } from '@app/features/recipes/hooks/useGetPublicRecipes';

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
