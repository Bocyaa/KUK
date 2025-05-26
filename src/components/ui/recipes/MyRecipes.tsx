import { ReactNode } from 'react';
import RecipeCardCarousel from './RecipeCardCarousel';
import chunkArray from '@app/utility/chunkArray';
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

interface MyRecipesProps {
  children: ReactNode;
}

function MyRecipes({ children }: MyRecipesProps) {
  const childrenArray = Array.isArray(children) ? children : [children];
  const chunkedChildren = chunkArray(childrenArray, 3);

  return (
    <div className="mt-6">
      <div className="mx-5 mb-4 flex items-center justify-between">
        <NavLink to="details">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">My Recipes</h2>
            <ChevronRightIcon className="h-6 w-6 stroke-[3] text-[#8c8c93]" />
          </div>
        </NavLink>
        <NavLink to="create-recipe">
          <PlusIcon className="h-6 w-6 text-[#0094f6]" />
        </NavLink>
      </div>

      <RecipeCardCarousel>
        {chunkedChildren.map((chunk, index) => (
          <div
            key={index}
            className="flex w-[22rem] flex-shrink-0 snap-center flex-col gap-2"
          >
            {chunk}
          </div>
        ))}
      </RecipeCardCarousel>
    </div>
  );
}

export default MyRecipes;
