import { ReactNode } from 'react';
import RecipeCardCarousel from './RecipeCardCarousel';
import { NavLink, useLocation } from 'react-router-dom';
import { PlusIcon } from '../Icons/PlusIcon';
import { ChevronRight } from '../Icons/ChevronRight';

interface MyCollectionsProps {
  children: ReactNode;
}

function MyCollections({ children }: MyCollectionsProps) {
  const location = useLocation();

  return (
    <div className="mt-4">
      <div className="mx-5 mb-3 flex items-center justify-between border-b border-[#f8f8f8] pb-1 dark:border-[#171418]">
        <NavLink to="collections-list" state={{ from: location.pathname }}>
          <div className="flex items-center gap-1">
            <h2 className="text-2xl font-bold">My Collections</h2>
            <ChevronRight className="h-7 w-7 text-ios-gray" />
          </div>
        </NavLink>

        <NavLink to={'create-collection'} state={{ from: location.pathname }}>
          <PlusIcon />
        </NavLink>
      </div>

      <RecipeCardCarousel gap="gap-2">{children}</RecipeCardCarousel>
    </div>
  );
}

export default MyCollections;
