import { useContext } from 'react';
import { AuthContext } from '@app/contexts/AuthContext';

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error('useAuth must be used within AuthProvider!');

  return context;
}

export { useAuth };
