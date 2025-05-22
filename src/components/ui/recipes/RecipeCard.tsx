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
}: RecipeCardProps) {
  return (
    <div className="flex w-[21rem] flex-shrink-0 snap-center flex-col">
      <span className="text-xs font-semibold uppercase text-[#0094f6]">
        {username}
      </span>
      <h2 className="mb-2 text-2xl font-normal leading-6">{title}</h2>
      {/*  */}

      <div className="relative h-56 w-[21rem] rounded-xl bg-neutral-100 shadow-sm">
        <img src={img} alt="Recipe Image" className="rounded-xl" />
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 top-32 rounded-xl bg-gradient-to-t from-[#212121]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 px-3 pb-2">
          <p className="text-xs font-medium text-white">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
