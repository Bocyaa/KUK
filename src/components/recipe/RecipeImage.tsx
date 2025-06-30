import RecipeTypes from '@app/shared/types/RecipeTypes';

interface RecipeImageProps {
  recipe: RecipeTypes;
}

function RecipeImage({ recipe }: RecipeImageProps) {
  return (
    <>
      {recipe.image_url && (
        <img
          src={recipe.image_url}
          alt={recipe.title + 'image'}
          className="z-1 w-full rounded-t-3xl"
        />
      )}
    </>
  );
}

export default RecipeImage;
