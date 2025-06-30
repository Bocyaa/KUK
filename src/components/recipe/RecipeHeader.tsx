import RecipeTypes from '@app/shared/types/RecipeTypes';

interface RecipeHeaderProps {
  recipe: RecipeTypes;
}

function RecipeHeader({ recipe }: RecipeHeaderProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="no-scrollbar overflow-x-auto whitespace-nowrap text-2xl font-bold text-ios-gray6">
          {recipe.title}
        </h1>
      </div>
      <h2 className="line-clamp-2 leading-5 text-ios-gray5/70">
        {recipe.description}
      </h2>
    </div>
  );
}

export default RecipeHeader;
