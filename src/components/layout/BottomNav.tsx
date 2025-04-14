import type { SVGProps, FC } from 'react';
import { NavLink } from 'react-router-dom';

import {
  HomeIcon as HomeOutline,
  PlusCircleIcon as AddOutline,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

import {
  HomeIcon as HomeSolid,
  PlusCircleIcon as AddSolid,
} from '@heroicons/react/24/solid';

import CustomMagnifyingGlass from '../ui/CustomMagnifyingGlass';

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
      key: 'recipes',
      label: 'Search',
      icon: { outline: CustomMagnifyingGlass, solid: CustomMagnifyingGlass },
      isCustom: true,
    },
    {
      key: 'add-recipe',
      label: 'Add',
      icon: { outline: AddOutline, solid: AddSolid },
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: {
        outline: AdjustmentsHorizontalIcon,
        solid: AdjustmentsHorizontalIcon,
      },
    },
  ];

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-md flex justify-around items-center pt-2 pb-7 z-50 h-[90px]'>
      {navItems.map((item) => (
        <NavLink
          to={`/${item.key}`}
          key={item.key}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-xs ${
              isActive
                ? 'text-gray-800 dark:text-white'
                : 'text-gray-400 dark:text-gray-500'
            }`
          }
        >
          {({ isActive }) => {
            const Icon = item.icon[isActive ? 'solid' : 'outline'];

            return (
              <>
                {item.isCustom ? (
                  <Icon className='w-6 h-6' bold={isActive} />
                ) : (
                  <Icon className='w-6 h-6' />
                )}
                <span>{item.label}</span>
              </>
            );
          }}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
