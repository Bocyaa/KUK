import { ReactNode } from 'react';
import BackLink from '../ui/BackLink';

interface HeaderProps {
  children?: ReactNode;
  title?: string;
  back?: string;
  customClasses?: string;
  dominantColor?: string;
}

const mainStyleBase =
  'fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-[26rem] items-center justify-between px-5 pb-2 pt-4 dark:border-b dark:border-[#39333c] border-b border-[#e6e6e6] rounded-b-3xl ';

const light = 'bg-gradient-to-b from-white to-white/70 backdrop-blur-sm';
const dark =
  'dark:bg-gradient-to-b dark:from-black dark:to-black/70 dark:backdrop-blur-sm';

function Header({
  children,
  title,
  back,
  customClasses,
  dominantColor,
}: HeaderProps) {
  // Create dynamic gradient style when dominantColor is provided
  const dynamicStyle = dominantColor
    ? {
        background: `linear-gradient(to bottom, ${dominantColor}, ${dominantColor}10)`,
        backdropFilter: 'blur(12px)',
      }
    : undefined;

  // Use shadow only when there's no dominantColor
  const mainStyle = mainStyleBase;

  return (
    <div
      className={`${customClasses ? customClasses : mainStyle + (dominantColor ? '' : light + ' ' + dark)} `}
      style={dynamicStyle}
    >
      {title && <h1 className="line-clamp-1 text-4xl font-bold">{title}</h1>}
      {children && children}
      <div className="absolute left-1 top-1 standalone:top-0">
        {back && <BackLink label={back} />}
      </div>
    </div>
  );
}

export default Header;
