import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ListBulletIcon, PencilIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface HeaderButtonIconProps {
  children?: ReactNode;
  icon: string;
  iconColor?: string;
}

function HeaderButtonIcon({
  icon,
  iconColor = '#0094f6',
}: HeaderButtonIconProps) {
  const header_buttons_Base =
    'flex h-8 w-8 items-center justify-center rounded-full border';

  const header_buttons_Light = `border-[#ebebeb] bg-[#f9f9f9] hover:bg-[#e0e0e0] active:bg-[#e0e0e0]`;

  const header_buttons_Dark = `dark:border-[#171418] dark:bg-[#212121] hover:bg-[#424242] active:bg-[#424242]`;

  const iconStyle = `h-5 w-5 stroke-[3] text-[${iconColor}]`;

  const buttonIcons = {
    list: <ListBulletIcon className={`${iconStyle}`} />,
    plus: <PlusIcon className={`${iconStyle}`} />,
    xmark: <XMarkIcon className={`${iconStyle}`} />,
    ellipsis: <EllipsisHorizontalIcon className={`${iconStyle}`} />,
    pencil: <PencilIcon className={`h-4 w-4 stroke-[3] text-[${iconColor}]`} />,
  };

  return (
    <div
      className={`${header_buttons_Base + header_buttons_Light + header_buttons_Dark} `}
    >
      {buttonIcons[icon as keyof typeof buttonIcons]}
    </div>
  );
}

export default HeaderButtonIcon;
