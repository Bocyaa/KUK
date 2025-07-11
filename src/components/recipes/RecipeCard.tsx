import GradientShadow from '../ui/GradientShadow';

interface RecipeCardProps {
  username: string;
  title: string;
  img?: string;
  labels?: string[];
  price?: number;
  description?: string;
  onClick?: () => void;
}

function RecipeCard({
  username,
  title,
  description = '',
  img = '',
  price = 0,
  onClick,
}: RecipeCardProps) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="flex w-[22rem] flex-shrink-0 snap-center flex-col">
        <span className="text-xs font-semibold uppercase text-[#0094f6]">
          {username}
        </span>
        <h3 className="no-scrollbar mb-2 overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-normal leading-7">
          {title}
        </h3>

        <div className="relative h-56 w-[22rem] overflow-hidden rounded-xl bg-neutral-100 shadow-md">
          <img src={img} alt="Recipe Image" />
          {price > 0 && (
            <div className="absolute right-0 top-0 mr-2 mt-2 flex items-center rounded-lg bg-[#424242]/70 px-2 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold text-white dark:text-[#e3e3e3]">
                {price} $
              </span>
            </div>
          )}
          <GradientShadow
            top="0 0 8rem 0"
            bottom="7rem 0 0 0"
            topOpacity={20}
            bottomOpacity={60}
          />
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
            <p className="line-clamp-2 text-xs text-[#ffffff] dark:text-[#e3e3e3]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
