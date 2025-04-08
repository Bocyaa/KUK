import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

function AppLayout() {
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
