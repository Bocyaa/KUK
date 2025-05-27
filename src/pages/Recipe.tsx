import HeaderButtonLink from '@app/components/ui/HeaderButtonLink';
import RecipeHeader from '@app/components/ui/recipes/RecipeHeader';
import SpinnerBar from '@app/components/ui/SpinnerBar';
import { useGetRecipe } from '@app/hooks/useGetRecipe';
import { useParams } from 'react-router-dom';
import ColorThief from 'colorthief';
import { useEffect, useState } from 'react';

function Recipe() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data: recipe, isLoading, error } = useGetRecipe(recipeId);
  const [dominantColor, setDominantColor] = useState<string>('');

  useEffect(() => {
    if (recipe?.image_url) {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          const color = colorThief.getColor(img);

          // Convert RGB to hex
          const toHex = (n: number) => n.toString(16).padStart(2, '0');
          const hexColor = `#${toHex(color[0])}${toHex(color[1])}${toHex(color[2])}`;

          setDominantColor(hexColor);
        } catch (error) {
          console.error('Error extracting color:', error);
          // Fallback to a default color in hex
          setDominantColor('#646464');
        }
      };

      img.onerror = () => {
        console.error('Error loading image for color extraction');
        setDominantColor('#646464');
      };

      img.src = recipe.image_url;
    }
  }, [recipe?.image_url]);

  if (isLoading) {
    return <SpinnerBar />;
  }

  if (error) {
    return <div>Error loading recipe: {error.message}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      {/*  */}
      <RecipeHeader>
        <>
          <div>
            <HeaderButtonLink to="/recipes" icon="xmark" />
          </div>
          <div className="flex gap-3 pb-2">
            <HeaderButtonLink to="/recipes" icon="pencil" />
            <HeaderButtonLink to="/recipes" icon="ellipsis" />
          </div>
        </>
      </RecipeHeader>

      {/*  */}
      <div className="flex h-[calc(100vh/1.5)] flex-col">
        <div
          className="flex h-full flex-col items-center pt-24"
          style={{ backgroundColor: dominantColor }}
        >
          {/* Image */}
          <div className="w-[calc(100vw/1.2)]">
            {recipe.image_url && (
              <img
                src={recipe.image_url}
                alt={recipe.title + 'image'}
                className="rounded-2xl shadow-2xl"
              />
            )}
          </div>

          {/* Title & Desc */}
          <div className="flex flex-col items-center py-5">
            <h1 className="text-2xl font-semibold text-[#ffffff]">
              {recipe.title}
            </h1>
            <h2 className="font-medium text-[#ffffff]">{recipe.description}</h2>
          </div>

          {/* Panel */}
          <div className="h-24 w-[calc(100vw/1.2)] rounded-2xl bg-white/20"></div>
        </div>
      </div>

      {/* White Bg */}
      <div className="p-5">
        <h3 className="text-lg font-medium">Ingredients</h3>
      </div>
    </div>
  );
}

export default Recipe;
