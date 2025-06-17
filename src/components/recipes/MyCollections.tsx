import { ReactNode } from 'react';
import RecipeCardCarousel from './RecipeCardCarousel';
import { NavLink } from 'react-router-dom';
import { PlusIcon } from '../Icons/PlusIcon';
import { ChevronRight } from '../Icons/ChevronRight';

interface MyCollectionsProps {
  children: ReactNode;
}

function MyCollections({ children }: MyCollectionsProps) {
  return (
    <div className="mt-4">
      <div className="mx-5 mb-3 flex items-center justify-between border-b border-[#f8f8f8] pb-1 dark:border-[#171418]">
        <NavLink to="collections-list">
          <div className="flex items-center gap-1">
            <h2 className="text-2xl font-bold">My collections</h2>
            <ChevronRight className="h-7 w-7 text-ios-gray" />
          </div>
        </NavLink>

        <NavLink to={'/create-recipe'}>
          <PlusIcon />
        </NavLink>
      </div>

      <RecipeCardCarousel gap="gap-2">{children}</RecipeCardCarousel>
    </div>
  );
}

export default MyCollections;
