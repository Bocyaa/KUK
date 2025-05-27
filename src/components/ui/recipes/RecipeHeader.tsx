import { ReactNode } from 'react';

interface RecipeHeaderProps {
  children?: ReactNode;
  title: string;
  back?: ReactNode;
}

const mainStyle =
  'fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-[26rem] items-center justify-between shadow-sm px-5 pb-2 pt-4 dark:border-b dark:border-[#171418] ';

const light = 'bg-gradient-to-b from-white to-white/70 backdrop-blur-sm';
const dark =
  'dark:bg-gradient-to-b dark:from-black dark:to-black/70 dark:backdrop-blur-sm';

function RecipeHeader({ children, title, back }: RecipeHeaderProps) {
  return (
    <div className={`${mainStyle} ${light} ${dark}`}>
      <div className="flex h-full flex-col gap-1">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
      {children && children}
      <div className="absolute left-0 top-1 standalone:top-0">
        {back && back}
      </div>
    </div>
  );
}

export default RecipeHeader;
