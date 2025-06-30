import { truncateText } from '@app/shared/utility/truncateDescription';
import GradientShadow from '../ui/GradientShadow';
import RecipeTypes from '@app/shared/types/RecipeTypes';
import Checkbox from '../ui/Checkbox';

interface SelectRecipeCardProps {
  recipe: RecipeTypes;
  handleRecipeToggle: (id: string) => void;
  selectedRecipes: string[];
}

function SelectRecipeCardRect({
  recipe,
  handleRecipeToggle,
  selectedRecipes,
}: SelectRecipeCardProps) {
  return (
    <>
      <div
        className="relative flex gap-3"
        key={recipe.id}
        onClick={() => handleRecipeToggle(recipe.id)}
      >
        {/* Image: */}
        <div className="relative h-16 w-20 flex-shrink-0 rounded-lg shadow-sm">
          <img
            src={recipe.image_url}
            alt="Recipe image"
            className="h-16 w-20 rounded-lg object-cover"
          />
          <GradientShadow
            top="0 0 2.5rem 0"
            bottom="2.5rem 0 0 0"
            topOpacity={20}
            bottomOpacity={50}
          />
        </div>

        {/* Title & Description */}
        <div className="flex min-w-0 flex-1 items-center justify-between">
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <h3 className="overflow-hidden text-ellipsis whitespace-nowrap font-medium leading-5">
              {truncateText(recipe.title, 6)}
            </h3>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-[#808080] dark:text-[#afafaf]">
              {truncateText(recipe.description, 10)}
            </span>
          </div>
          <div className="z-10 pr-4">
            <Checkbox
              id={`recipe-${recipe.id}`}
              checked={selectedRecipes.includes(recipe.id)}
              onChange={() => handleRecipeToggle(recipe.id)}
            />
          </div>
        </div>

        <div
          className={`absolute inset-0 rounded-lg ${selectedRecipes.includes(recipe.id) ? 'bg-white/30' : 'bg-transparent'}`}
        ></div>
      </div>
      <div className="ml-[5.9rem] border-b last:border-none dark:border-[#39333c]"></div>
    </>
  );
}

export default SelectRecipeCardRect;
