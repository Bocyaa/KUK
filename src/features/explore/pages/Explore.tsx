import { useState } from 'react';

import RecipeGrid from '@app/components/explore/RecipeGrid';
import SearchBar from '@app/components/explore/SearchBar';
import Header from '@app/components/layout/Header';

import { useGetPublicRecipes } from '@app/features/recipes/hooks/useGetPublicRecipes';

function Explore() {
  // const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { data: recipes } = useGetPublicRecipes(); // Fetch public recipes

  return (
    <div className="mt-[3.7rem] h-screen">
      <Header>
        <SearchBar isFocused={isFocused} setIsFocused={setIsFocused} />
      </Header>

      <RecipeGrid recipes={recipes} />
    </div>
  );
}

export default Explore;
