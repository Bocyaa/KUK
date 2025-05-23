import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import GradientShadow from '../GradientShadow';
import RecipeDescription from './RecipeDescription';

interface RecipeListCardProps {
  recipe: {
    image_url: string;
    title: string;
    description: string;
  };
}

function RecipeListCard({ recipe }: RecipeListCardProps) {
  return (
    <>
      <div className="flex gap-3">
        {/* Image: */}
        <div className="relative h-16 w-32">
          <img
            src={recipe.image_url}
            alt="Recipe image"
            className="h-16 w-32 rounded-lg object-cover"
          />
          <GradientShadow
            top="0 0 2.5rem 0"
            bottom="2.5rem 0 0 0"
            topOpacity={20}
            bottomOpacity={50}
          />
        </div>

        {/* Title & Description */}
        <div className="flex w-full items-center justify-between">
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <h3 className="text-xl font-medium leading-5">{recipe.title}</h3>
            <RecipeDescription
              description={recipe.description}
              className="text-[#5d5d5d] dark:text-[#afafaf]"
            />
          </div>
          <div className="flex-shrink-0 pr-2">
            <EllipsisHorizontalIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="ml-[6.60rem] border-b last:border-none dark:border-[#424242]"></div>
    </>
  );
}

export default RecipeListCard;
