import { Outlet, useNavigate } from 'react-router-dom';

import Header from './Header';
import BottomNav from './BottomNav';

import { useAuth } from '../../contexts/AuthProvider';

function AppLayout() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className='p-4 text-center'>Loading...</div>;

  if (!session) {
    navigate('/login');
    return null;
  }

  return (
    <div className='flex flex-col h-screen'>
      <Header />

      <main className='flex-1 overflow-y-auto px-4 py-2 pb-16'>
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}

export default AppLayout;
