import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js'; // Import the Session type

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  isEmailVerified: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  isEmailVerified: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setIsEmailVerified(!!session?.user?.email_confirmed_at);
      setLoading(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsEmailVerified(!!session?.user?.email_confirmed_at);
    });

    init();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, isEmailVerified }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
