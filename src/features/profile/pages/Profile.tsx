import Header from '@app/components/layout/Header';
import Avatar from '@app/components/settings/Avatar';
import {
  useGetUserProfile,
  useInvalidateUserPofile,
} from '@app/shared/hooks/useGetUserProfile';
import { supabase } from '@app/shared/lib/supabaseClient';
import { NavLink, useNavigate } from 'react-router-dom';

function Profile() {
  const { data: profile, isLoading } = useGetUserProfile();
  const navigate = useNavigate();
  const invalidateUserProfile = useInvalidateUserPofile();

  if (isLoading) return 'Loading ...';

  async function handleLogOut() {
    await supabase.auth.signOut();
    invalidateUserProfile();
    navigate('/login');
  }

  return (
    <div className="mt-20 flex h-screen flex-col items-center">
      <Header title={profile.username}>
        <NavLink to="/profile">
          <Avatar
            src={isLoading ? 'Loading' : profile.avatar_url}
            size={40}
            accent="bg-[#f6f6f6] dark:text-[#a0a0a0]"
          />
        </NavLink>
      </Header>

      <button
        className="rounded-lg border px-3 py-1 font-semibold text-red-500 shadow-sm active:scale-90"
        onClick={handleLogOut}
      >
        Log out
      </button>
    </div>
  );
}

export default Profile;
