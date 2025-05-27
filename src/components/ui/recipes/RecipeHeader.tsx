import { ReactNode } from 'react';

interface RecipeHeaderProps {
  children?: ReactNode;
  title?: string;
  back?: ReactNode;
  customClasses?: string;
}

const mainStyle =
  'fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-[26rem] items-center justify-between shadow-sm px-5 pb-2 pt-4 dark:border-b dark:border-[#171418] ';

const light = 'bg-gradient-to-b from-white to-white/70 backdrop-blur-sm';
const dark =
  'dark:bg-gradient-to-b dark:from-black dark:to-black/70 dark:backdrop-blur-sm';

function RecipeHeader({
  children,
  title,
  back,
  customClasses,
}: RecipeHeaderProps) {
  return (
    <div
      className={`${customClasses ? customClasses : mainStyle + light + dark}`}
    >
      {title && <h1 className="text-4xl font-bold">{title}</h1>}
      {children && children}
      <div className="absolute left-1 top-1 standalone:top-0">
        {back && back}
      </div>
    </div>
  );
}

export default RecipeHeader;
