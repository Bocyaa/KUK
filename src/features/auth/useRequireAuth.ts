import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { useEffect } from 'react';

export function useRequireAuth(requireVerification = true) {
  const { session, loading, isEmailVerified } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!session) {
      navigate('/login');
      return;
    }

    if (requireVerification && !isEmailVerified) {
      navigate('/confirm-email');
    }
  }, [session, loading, isEmailVerified, navigate, requireVerification]);

  return { session, loading, isEmailVerified };
}
