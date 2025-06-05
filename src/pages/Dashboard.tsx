import Header from '@app/components/recipes/Header';
import Avatar from '@app/components/settings/Avatar';
import { useGetUserProfile } from '@app/hooks/useGetUserProfile';
import { NavLink } from 'react-router-dom';

function Dashboard() {
  // const { data: profile, isLoading } = useGetUserProfile();

  return (
    <div className="mt-20 h-screen">
      <Header title="Dashboard">
        {/* <NavLink to="/profile">
          <Avatar
            src={isLoading ? 'Loading' : profile.avatar_url}
            size={40}
            accent="bg-[#f6f6f6] dark:text-[#a0a0a0]"
          />
        </NavLink> */}
      </Header>
      <p>Dashboard</p>
    </div>
  );
}

export default Dashboard;
