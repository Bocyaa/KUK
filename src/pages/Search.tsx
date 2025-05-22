import RecipeCard from '@app/components/ui/recipes/RecipeCard';
import RecipeCardCarousel from '@app/components/ui/recipes/RecipeCardCarousel';
import RecipeHeader from '@app/components/ui/recipes/RecipeHeader';
import { useGetRecipes } from '@app/hooks/useGetRecipes';
import { useGetUserProfile } from '@app/hooks/useGetUserProfile';

function Search() {
  const { data: profile, isPending } = useGetUserProfile();
  const { data: recipes, error, isLoading } = useGetRecipes();

  const sortedRecipes = recipes
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

  console.log(recipes);

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
            />
          ))}
        </RecipeCardCarousel>
      </div>
    </div>
  );
}

export default Search;
