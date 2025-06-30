import RecipeTypes from '@app/shared/types/RecipeTypes';
import { useNavigate } from 'react-router-dom';

interface RecipeGridProps {
  recipes: RecipeTypes[] | undefined;
}

function RecipeGrid({ recipes }: RecipeGridProps) {
  const navigate = useNavigate();

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/explore/${recipeId}`);
  };

  return (
    <div className="grid grid-cols-3 gap-[0.1rem]">
      {recipes?.map((recipe: RecipeTypes) => (
        <div
          key={recipe.id}
          className="relative overflow-hidden shadow-md"
          onClick={() => handleRecipeClick(recipe.id)}
        >
          {recipe.image_url && (
            <div className="aspect-square overflow-hidden">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/*  */}
          {/* <div className="absolute bottom-0 flex w-full bg-gradient-to-t from-black to-transparent text-[#ffffff]">
            <h3 className="line-clamp-1 text-ellipsis pl-1 text-sm tracking-wider">
              {recipe.title}
            </h3>
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default RecipeGrid;
