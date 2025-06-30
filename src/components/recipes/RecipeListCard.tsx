import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import GradientShadow from '../ui/GradientShadow';
import { truncateText } from '@app/shared/utility/truncateDescription';
import RecipeTypes from '@app/shared/types/RecipeTypes';

interface RecipeListCardProps {
  recipe: RecipeTypes;
  onClick?: () => void;
}

function RecipeListCard({ recipe, onClick }: RecipeListCardProps) {
  return (
    <>
      <div className="flex gap-3" onClick={onClick}>
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
          <div className="">
            <EllipsisHorizontalIcon className="mx-[0.6rem] h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="ml-[5.9rem] border-b last:border-none dark:border-[#39333c]"></div>
    </>
  );
}

export default RecipeListCard;
