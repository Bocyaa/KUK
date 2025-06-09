import { ReactNode } from 'react';
import RecipeCardCarousel from './RecipeCardCarousel';
import { NavLink } from 'react-router-dom';

interface MyCollectionsProps {
  children: ReactNode;
}

function MyCollections({ children }: MyCollectionsProps) {
  return (
    <div className="mt-4">
      <div className="mx-5 mb-3 flex items-center border-b border-[#f8f8f8] pb-1 dark:border-[#171418]">
        <NavLink to="my-collections-list">
          <h2 className="text-2xl font-bold">My collections</h2>
        </NavLink>
      </div>

      <RecipeCardCarousel gap="gap-2">{children}</RecipeCardCarousel>
    </div>
  );
}

export default MyCollections;
