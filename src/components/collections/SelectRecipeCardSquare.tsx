import { truncateText } from '@app/shared/utility/truncateDescription';
import Checkbox from '../ui/Checkbox';
import RecipeTypes from '@app/shared/types/RecipeTypes';

interface SelectRecipeCardProps {
  recipe: RecipeTypes;
  handleRecipeToggle: (id: string) => void;
  selectedRecipes: string[];
}

function SelectRecipeCard({
  recipe,
  handleRecipeToggle,
  selectedRecipes,
}: SelectRecipeCardProps) {
  return (
    <div
      key={recipe.id}
      onClick={() => handleRecipeToggle(recipe.id)}
      className="relative"
    >
      {/* Image */}
      <div className="h-32 w-44 flex-shrink-0 rounded-t-lg shadow-sm">
        <img
          src={recipe.image_url}
          alt="Recipe image"
          className="h-32 w-44 rounded-t-lg"
        />
      </div>

      {/* Title & Description */}
      <div className="flex items-center justify-between rounded-b-lg border-x border-b border-[#e6e6e6] bg-white p-2 shadow-sm dark:border-transparent dark:bg-[#212121]">
        <h3 className="line-clamp-1 overflow-hidden text-ellipsis font-medium leading-5 text-[#0d0d0d] dark:text-[#ffffff]">
          {truncateText(recipe.title, 6)}
        </h3>
      </div>

      {/* Front Layer for Selected */}
      <div
        className={`absolute inset-0 rounded-lg ${selectedRecipes.includes(recipe.id) ? 'bg-white/30' : 'bg-transparent'}`}
      ></div>

      <div className="absolute right-0 top-0 p-1">
        <Checkbox
          id={`recipe-${recipe.id}`}
          checked={selectedRecipes.includes(recipe.id)}
          onChange={() => handleRecipeToggle(recipe.id)}
        />
      </div>
    </div>
  );
}

export default SelectRecipeCard;
