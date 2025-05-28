import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ListBulletIcon, PencilIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface HeaderButtonIconProps {
  children?: ReactNode;
  icon: string;
  iconColor?: string;
  transparent?: boolean;
}

function HeaderButtonIcon({
  icon,
  iconColor = '#0094f6',
  transparent,
}: HeaderButtonIconProps) {
  const header_buttons_Base =
    'flex h-8 w-8 items-center justify-center rounded-full border';

  const header_buttons_Light = `${transparent ? 'bg-[#f9f9f9]/10 border-[#ebebeb]/10' : 'bg-[#f9f9f9] border-[#ebebeb]'} hover:bg-[#e0e0e0] active:bg-[#e0e0e0]`;

  const header_buttons_Dark = `dark:border-[#171418] dark:bg-[#212121] hover:bg-[#424242] active:bg-[#424242]`;

  // Use inline styles for dynamic colors instead of Tailwind classes
  const iconStyle = {
    width: '1.25rem',
    height: '1.25rem',
    strokeWidth: '3',
    color: iconColor,
  };

  const pencilIconStyle = {
    width: '1rem',
    height: '1rem',
    strokeWidth: '3',
    color: iconColor,
  };

  const buttonIcons = {
    list: <ListBulletIcon style={iconStyle} />,
    plus: <PlusIcon style={iconStyle} />,
    xmark: <XMarkIcon style={iconStyle} />,
    ellipsis: <EllipsisHorizontalIcon style={iconStyle} />,
    pencil: <PencilIcon style={pencilIconStyle} />,
  };

  return (
    <div
      className={`${header_buttons_Base} ${header_buttons_Light} ${header_buttons_Dark} `}
    >
      {buttonIcons[icon as keyof typeof buttonIcons]}
    </div>
  );
}

export default HeaderButtonIcon;
