import type { SVGProps, FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
import { restoreThemeColor } from '@app/utility/updateThemeColor';

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
      key: 'dashboard',
      label: 'Home',
      path: '/dashboard',
      icon: { outline: HomeOutline, solid: HomeSolid },
    },
    {
      key: 'explore',
      label: 'Explore',
      path: '/explore',
      icon: { outline: Telescope, solid: Telescope },
    },
    {
      key: 'recipes',
      label: 'Recipes',
      path: '/recipes',
      icon: { outline: SquaresPlusOutline, solid: SquaresPlusSolid },
      isCustom: true,
    },
    {
      key: 'search',
      label: 'Search',
      path: '/search',
      icon: { outline: CustomMagnifyingGlass, solid: CustomMagnifyingGlass },
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

  // TODO: Reimplement this nav bar in other way and make the middle button usable for other cases as well, for example for cancelling recipe creation.

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center">
      <div className="flex w-full justify-center bg-gradient-to-t from-white/50 to-transparent px-4 pb-2 backdrop-blur-sm dark:from-black/90 standalone:pb-8">
        <nav className="flex h-[70px] w-full max-w-[26rem] items-center justify-around rounded-full border border-[#e6e6e6] bg-white/90 shadow-md backdrop-blur-xl dark:border-[#424242] dark:bg-[#1e1e1e]/75 standalone:h-[70px]">
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
                {item.isCustom ? (
                  <Icon className="h-6 w-6" />
                ) : (
                  <Icon className="h-6 w-6" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default BottomNav;
