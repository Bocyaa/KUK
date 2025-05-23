import MyRecipes from '@app/components/ui/recipes/MyRecipes';
import RecipeCard from '@app/components/ui/recipes/RecipeCard';
import RecipeCardCarousel from '@app/components/ui/recipes/RecipeCardCarousel';
import RecipeHeader from '@app/components/ui/recipes/RecipeHeader';
import RecipeListCard from '@app/components/ui/recipes/RecipeListCard';
import { useGetRecipes } from '@app/hooks/useGetRecipes';
import { useGetUserProfile } from '@app/hooks/useGetUserProfile';

function Search() {
  const { data: profile, isPending } = useGetUserProfile();
  const { data: recipes } = useGetRecipes(); // error, isLoading

  const sortedRecipes = recipes
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ) || [''];

  return (
    <div className="mb-12">
      <RecipeHeader profile={profile} isPending={isPending} />

      <div className="mt-16">
        <RecipeCardCarousel>
          {sortedRecipes?.map((r) => (
            <RecipeCard
              username="fazi"
              title={r.title}
              description={r.description}
              img={r.image_url}
              price={r.price}
            />
          ))}
        </RecipeCardCarousel>
        {/* END */}

        <MyRecipes>
          {sortedRecipes?.map((r) => <RecipeListCard recipe={r} />)}
        </MyRecipes>
      </div>
    </div>
  );
}

export default Search;
