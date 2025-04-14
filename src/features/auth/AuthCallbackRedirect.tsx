import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

function AuthCallbackRedirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  useEffect(() => {
    async function handleCallback() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        navigate('/login');
        return;
      }

      if (type === 'recovery') {
        navigate('/reset-password');
        return;
      }

      // Existing profile check logic
      const { data: profile } = await supabase
        .from('profiles')
        .select('username, birthdate, country')
        .eq('id', session.user.id)
        .single();

      if (profile?.username && profile?.birthdate && profile?.country) {
        navigate('/dashboard');
      } else {
        navigate('/complete-profile');
      }
    }

    handleCallback();
  }, [navigate, type]);

  return <div className='text-center p-4'>Redirecting...</div>;
}

export default AuthCallbackRedirect;
