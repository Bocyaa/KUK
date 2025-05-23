import { ReactNode } from 'react';
import RecipeCardCarousel from './RecipeCardCarousel';
import chunkArray from '@app/utility/chunkArray';

interface MyRecipesProps {
  children: ReactNode;
}

function MyRecipes({ children }: MyRecipesProps) {
  const childrenArray = Array.isArray(children) ? children : [children];
  const chunkedChildren = chunkArray(childrenArray, 3);

  return (
    <div className="mt-6">
      <h2 className="mb-4 ml-5 text-2xl font-bold">My Recipes</h2>

      <RecipeCardCarousel>
        {chunkedChildren.map((chunk, index) => (
          <div
            key={index}
            className="flex w-[21rem] flex-shrink-0 snap-center flex-col gap-2"
          >
            {chunk}
          </div>
        ))}
      </RecipeCardCarousel>
    </div>
  );
}

export default MyRecipes;
