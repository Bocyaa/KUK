import { Session } from '@supabase/supabase-js';
import { createContext } from 'react';

type AuthContextType = {
  session: Session | null;
  setSession?: (session: Session | null) => void;
  loading: boolean;
  setLoading?: (loading: boolean) => void;
  isEmailVerified: boolean;
  setIsEmailVerified?: (isEmailVerified: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  isEmailVerified: false,
});

export { AuthContext };
export type { AuthContextType };
