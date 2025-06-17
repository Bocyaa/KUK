import { Outlet, useLocation, useNavigate } from 'react-router-dom';

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
    <div>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={300}
          unmountOnExit
        >
          <main className="no-scrollbar relative h-screen overflow-y-auto">
            <Outlet />
          </main>
        </CSSTransition>
      </TransitionGroup>

      <BottomNav />
    </div>
  );
}

export default AppLayout;
