import { ReactNode } from 'react';

interface RecipeHeaderProps {
  children?: ReactNode;
  title: string;
  back?: ReactNode;
}

function RecipeHeader({ children, title, back }: RecipeHeaderProps) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-[26rem] items-center justify-between bg-white/70 px-5 pb-2 pt-1 shadow-sm backdrop-blur-md dark:bg-black/70 dark:backdrop-blur-md">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold">{title}</h1>
        {back && back}
      </div>
      {children && children}
    </div>
  );
}

export default RecipeHeader;
