import { ReactNode } from 'react';

interface RecipeHeaderProps {
  children?: ReactNode;
  title?: string;
  back?: ReactNode;
  customClasses?: string;
  dominantColor?: string;
}

const mainStyleBase =
  'fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-[26rem] items-center justify-between px-5 pb-2 pt-4 dark:border-b dark:border-[#171418] ';

const mainStyleWithShadow = mainStyleBase + 'shadow-sm ';

const light = 'bg-gradient-to-b from-white to-white/70 backdrop-blur-sm';
const dark =
  'dark:bg-gradient-to-b dark:from-black dark:to-black/70 dark:backdrop-blur-sm';

function RecipeHeader({
  children,
  title,
  back,
  customClasses,
  dominantColor,
}: RecipeHeaderProps) {
  // Create dynamic gradient style when dominantColor is provided
  const dynamicStyle = dominantColor
    ? {
        background: `linear-gradient(to bottom, ${dominantColor}, ${dominantColor}70)`,
        backdropFilter: 'blur(8px)',
      }
    : undefined;

  // Use shadow only when there's no dominantColor
  const mainStyle = dominantColor ? mainStyleBase : mainStyleWithShadow;

  return (
    <div
      className={`${customClasses ? customClasses : mainStyle + (dominantColor ? '' : light + dark)}`}
      style={dynamicStyle}
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
