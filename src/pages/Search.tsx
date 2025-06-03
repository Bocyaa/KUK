import RecipeHeader from '@app/components/recipes/RecipeHeader';
import Avatar from '@app/components/settings/Avatar';
import { useGetUserProfile } from '@app/hooks/useGetUserProfile';
import { NavLink } from 'react-router-dom';

function Search() {
  const { data: profile, isLoading } = useGetUserProfile();

  return (
    <div className="mt-20 h-screen">
      <RecipeHeader title="Search">
        <NavLink to="/profile">
          <Avatar
            src={isLoading ? 'Loading' : profile.avatar_url}
            size={40}
            accent="bg-[#f6f6f6] dark:text-[#a0a0a0]"
          />
        </NavLink>
      </RecipeHeader>

      <p>Search</p>
    </div>
  );
}

export default Search;
