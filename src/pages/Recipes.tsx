import MyRecipes from '@app/components/ui/recipes/MyRecipes';
import RecipeCard from '@app/components/ui/recipes/RecipeCard';
import RecipeCardCarousel from '@app/components/ui/recipes/RecipeCardCarousel';
import RecipeHeader from '@app/components/ui/recipes/RecipeHeader';
import RecipeListCard from '@app/components/ui/recipes/RecipeListCard';
import Avatar from '@app/components/ui/settings/Avatar';
import SpinnerBar from '@app/components/ui/SpinnerBar';
import { useGetRecipes } from '@app/hooks/useGetRecipes';
import { useGetUserProfile } from '@app/hooks/useGetUserProfile';
import { NavLink } from 'react-router-dom';

function Recipes() {
  const { data: profile, isLoading: isLoadingProfile } = useGetUserProfile();
  const { data: recipes, isLoading: isLoadingRecipes } = useGetRecipes(); // error, isLoading

  const randomRecipes = recipes
    ? [...recipes].sort(() => Math.random() - 0.5)
    : [];

  const sortedRecipes = recipes
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ) || [''];

  if (isLoadingProfile) return <SpinnerBar />;
  if (isLoadingRecipes) return <SpinnerBar />;

  return (
    <div className="mb-12 h-screen">
      <RecipeHeader title="Recipes">
        <NavLink to="/profile">
          <Avatar
            src={profile.avatar_url}
            size={40}
            accent="bg-[#f6f6f6] dark:text-[#a0a0a0]"
          />
        </NavLink>
      </RecipeHeader>

      <div className="mt-16">
        <RecipeCardCarousel>
          {randomRecipes?.map((r) => (
            <RecipeCard
              username="fazi"
              title={r.title}
              description={r.description}
              img={r.image_url}
              price={r.price}
            />
          ))}
        </RecipeCardCarousel>

        <MyRecipes>
          {sortedRecipes?.map((r) => <RecipeListCard recipe={r} />)}
        </MyRecipes>
      </div>
    </div>
  );
}

export default Recipes;
