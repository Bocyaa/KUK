import { ReactNode } from 'react';
import RecipeCardCarousel from './RecipeCardCarousel';
import chunkArray from '@app/utility/chunkArray';
import { NavLink } from 'react-router-dom';

interface MyRecipesProps {
  children: ReactNode;
}

function MyRecipes({ children }: MyRecipesProps) {
  const childrenArray = Array.isArray(children) ? children : [children];
  const chunkedChildren = chunkArray(childrenArray, 3);

  return (
    <div className="mt-6">
      <div className="mx-5 mb-3 flex items-center border-b border-[#f8f8f8] pb-1 dark:border-[#171418]">
        <NavLink to="details">
          <h2 className="text-2xl font-bold">My Recipes</h2>
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
