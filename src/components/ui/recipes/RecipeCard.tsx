import GradientShadow from '../GradientShadow';
import RecipeDescription from './RecipeDescription';

interface RecipeCardProps {
  username: string;
  title: string;
  img?: string;
  labels?: string[];
  price?: number;
  description?: string;
}

function RecipeCard({
  username,
  title,
  description = '',
  img = '',
  price = 0,
}: RecipeCardProps) {
  return (
    <div className="flex w-[21rem] flex-shrink-0 snap-center flex-col">
      <span className="text-xs font-semibold uppercase text-[#0094f6]">
        {username}
      </span>
      <h3 className="mb-2 text-2xl font-normal leading-6">{title}</h3>

      <div className="relative h-56 w-[21rem] rounded-xl bg-neutral-100 shadow-md">
        <img src={img} alt="Recipe Image" className="rounded-xl" />
        {price > 0 && (
          <div className="absolute right-0 top-0 mr-2 mt-2 flex items-center rounded-lg bg-[#424242]/70 px-2 py-1">
            <span className="text-xs text-white dark:text-[#e3e3e3]">
              {price} $
            </span>
          </div>
        )}
        <GradientShadow
          top="0 0 2.5rem 0"
          bottom="2.5rem 0 0 0"
          topOpacity={20}
          bottomOpacity={60}
        />
        <div className="absolute bottom-0 left-0 px-3 pb-2">
          <RecipeDescription
            description={description}
            className="text-xs text-[#e3e3e3] dark:text-[#afafaf]"
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
