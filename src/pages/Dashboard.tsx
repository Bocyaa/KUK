import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/hooks/useAuth';

function Dashboard() {
  const { isEmailVerified } = useAuth();
  if (!isEmailVerified) {
    return <Navigate to="/confirm-email" replace />;
  }

  return (
    <div className="mt-20">
      <p>Dashboard</p>
    </div>
  );
}

export default Dashboard;
