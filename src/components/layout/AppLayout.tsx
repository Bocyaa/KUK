import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// import Header from './Header';
import BottomNav from './BottomNav';

import { useAuth } from '@app/contexts/hooks/useAuth';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function AppLayout() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  if (!session) {
    navigate('/login');
    return null;
  }

  return (
    <div className="no-scrollbar relative mx-auto flex h-screen max-w-[26rem] flex-col overflow-y-auto bg-[#ffffff] dark:bg-[#000000] dark:text-[#ffffff]">
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={300}
          unmountOnExit
        >
          <main>
            <Outlet />
          </main>
        </CSSTransition>
      </TransitionGroup>

      <BottomNav />
    </div>
  );
}

export default AppLayout;
