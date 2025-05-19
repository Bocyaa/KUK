import type { SVGProps, FC } from 'react';
import { NavLink } from 'react-router-dom';

import {
  HomeIcon as HomeOutline,
  PlusCircleIcon as AddOutline,
  UserIcon as UserOutline,
  // AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

import {
  HomeIcon as HomeSolid,
  PlusCircleIcon as AddSolid,
  UserIcon as UserSolid,
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
      key: 'search',
      label: 'Search',
      icon: { outline: CustomMagnifyingGlass, solid: CustomMagnifyingGlass },
      isCustom: true,
    },
    {
      key: 'create-recipe',
      label: 'Create',
      icon: { outline: AddOutline, solid: AddSolid },
    },
    {
      key: 'settings',
      label: 'You',
      icon: {
        outline: UserOutline,
        solid: UserSolid,
      },
    },
  ];

  return (
    <nav
      className={
        'bottom-nav fixed inset-x-0 bottom-0 z-50 flex h-[70px] items-center justify-around border-t border-gray-300 bg-[#f9fafb] pb-3 pt-2 dark:border-[#1c1c1c] dark:bg-[#242533] standalone:h-[90px] standalone:pb-7'
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
