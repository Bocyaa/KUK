import Header from '@app/components/layout/Header';
import Avatar from '@app/components/settings/Avatar';
import { useGetUserProfile } from '@app/hooks/useGetUserProfile';
import { NavLink } from 'react-router-dom';

function Profile() {
  const { data: profile, isLoading } = useGetUserProfile();

  if (isLoading) return 'Loading ...';

  return (
    <div className="mt-20 h-screen">
      <Header title={profile.username}>
        <NavLink to="/profile">
          <Avatar
            src={isLoading ? 'Loading' : profile.avatar_url}
            size={40}
            accent="bg-[#f6f6f6] dark:text-[#a0a0a0]"
          />
        </NavLink>
      </Header>

      <p className="ml-5">This page is in development, come later ...</p>
    </div>
  );
}

export default Profile;
