import { Session } from '@supabase/supabase-js';
import { ReactNode, useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from '../AuthContext';
import { supabase } from '@app/shared/lib/supabaseClient';

function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setIsEmailVerified(!!session?.user?.email_confirmed_at);
      setLoading(false);
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsEmailVerified(!!session?.user?.email_confirmed_at);
    });

    init();

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    session,
    setSession,
    loading,
    setLoading,
    isEmailVerified,
    setIsEmailVerified,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
