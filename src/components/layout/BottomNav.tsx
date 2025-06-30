import type { SVGProps, FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  UserIcon as UserOutline,
  SquaresPlusIcon as SquaresPlusOutline,
  Squares2X2Icon as SquaresIconOutline,
} from '@heroicons/react/24/outline';

import {
  UserIcon as UserSolid,
  SquaresPlusIcon as SquaresPlusSolid,
  Squares2X2Icon as SquaresIconSolid,
} from '@heroicons/react/24/solid';

import { Telescope } from 'lucide-react';
import { restoreThemeColor } from '@app/shared/utility/updateThemeColor';

type StandardIcon = FC<{ className?: string }>;
type CustomIcon = FC<SVGProps<SVGSVGElement> & { bold?: boolean }>;

interface NavItem {
  key: string;
  label: string;
  path: string;
  isCustom?: boolean;
  icon: {
    outline: StandardIcon | CustomIcon;
    solid: StandardIcon | CustomIcon;
  };
}

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      key: 'recipes',
      label: 'Recipes',
      path: '/recipes',
      icon: { outline: SquaresIconOutline, solid: SquaresIconSolid },
      isCustom: true,
    },
    {
      key: 'explore',
      label: 'Explore',
      path: '/explore',
      icon: { outline: Telescope, solid: Telescope },
    },
    {
      key: 'create-recipe',
      label: 'Create',
      path: '/create-recipe',
      icon: { outline: SquaresPlusOutline, solid: SquaresPlusSolid },
    },
    {
      key: 'profile',
      label: 'You',
      path: '/profile',
      icon: { outline: UserOutline, solid: UserSolid },
    },
  ];

  const handleNavClick = (path: string) => {
    restoreThemeColor();
    navigate(path);
  };

  const isActive = (path: string) => {
    const currentPath = location.pathname;

    // Exact match
    if (currentPath === path) return true;

    // Check if it's a nested route (path + slash + something)
    if (currentPath.startsWith(path + '/')) return true;

    return false;
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex justify-center">
      <nav className="flex h-14 w-full items-center justify-around rounded-t-3xl border-t border-[#e6e6e6] bg-white/70 backdrop-blur-md dark:border-[#39333c] dark:bg-[#1e1e1e]/75 standalone:h-[5.2rem] standalone:pb-8">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon[active ? 'solid' : 'outline'];

          return (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.path)}
              className={`flex flex-col items-center gap-1 text-xs ${
                active
                  ? 'text-gray-800 dark:text-[#f3f3f3]'
                  : 'text-gray-400 dark:text-[#666666]'
              }`}
            >
              <Icon className="h-7 w-7" />
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default BottomNav;
