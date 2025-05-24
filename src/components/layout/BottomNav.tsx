import type { SVGProps, FC } from 'react';
import { NavLink } from 'react-router-dom';

import {
  HomeIcon as HomeOutline,
  UserIcon as UserOutline,
  SquaresPlusIcon as SquaresPlusOutline,
} from '@heroicons/react/24/outline';

import {
  HomeIcon as HomeSolid,
  UserIcon as UserSolid,
  SquaresPlusIcon as SquaresPlusSolid,
} from '@heroicons/react/24/solid';

import CustomMagnifyingGlass from '../ui/CustomMagnifyingGlass';
import { Telescope } from 'lucide-react';

type StandardIcon = FC<{ className?: string }>;
type CustomIcon = FC<SVGProps<SVGSVGElement> & { bold?: boolean }>;

interface NavItem {
  key: string;
  label: string;
  isCustom?: boolean;
  icon: {
    outline: StandardIcon | CustomIcon;
    solid: StandardIcon | CustomIcon;
  };
}

function BottomNav() {
  const navItems: NavItem[] = [
    {
      key: 'dashboard',
      label: 'Home',
      icon: { outline: HomeOutline, solid: HomeSolid },
    },
    {
      key: 'explore',
      label: 'Explore',
      icon: { outline: Telescope, solid: Telescope },
    },
    {
      key: 'recipes',
      label: 'Recipes',
      icon: { outline: SquaresPlusOutline, solid: SquaresPlusSolid },
      isCustom: true,
    },
    {
      key: 'search',
      label: 'Search',
      icon: { outline: CustomMagnifyingGlass, solid: CustomMagnifyingGlass },
    },
    {
      key: 'profile',
      label: 'You',
      icon: {
        outline: UserOutline,
        solid: UserSolid,
      },
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mb-2 flex justify-center px-4 standalone:mb-8">
      <nav
        className={
          'flex h-[70px] w-full max-w-[26rem] items-center justify-around rounded-full border border-[#e6e6e6] bg-white/75 shadow-md backdrop-blur-sm dark:border-[#424242] dark:bg-[#1e1e1e]/75 standalone:h-[70px]'
        }
      >
        {navItems.map((item) => (
          <NavLink
            to={`/${item.key}`}
            key={item.key}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs ${
                isActive
                  ? 'text-gray-800 dark:text-[#f3f3f3]'
                  : 'text-gray-400 dark:text-[#666666]'
              }`
            }
          >
            {({ isActive }) => {
              const Icon = item.icon[isActive ? 'solid' : 'outline'];

              return (
                <>
                  {item.isCustom ? (
                    <Icon className="h-6 w-6" bold={isActive} />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                  {/* <span className="">{item.label}</span> */}
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default BottomNav;
