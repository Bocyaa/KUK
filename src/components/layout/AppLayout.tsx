import { Outlet, useNavigate } from 'react-router-dom';

// import Header from './Header';
import BottomNav from './BottomNav';

import { useAuth } from '@app/contexts/hooks/useAuth';

function AppLayout() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  if (!session) {
    navigate('/login');
    return null;
  }

  return (
    <div className="relative mx-auto flex h-screen max-w-[26rem] flex-col">
      {/* <Header /> */}

      {/* overflow-y-auto px-4 py-2 pb-16 */}
      <main className="bg-[#ffffff] dark:bg-[#000000] dark:text-[#ffffff]">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}

export default AppLayout;
