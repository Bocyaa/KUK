import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

function AuthCallbackRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('username, birthdate, country')
        .eq('id', user.id)
        .single();

      if (profile?.username && profile?.birthdate && profile?.country) {
        navigate('/dashboard');
      } else {
        navigate('/complete-profile');
      }
    };

    checkProfile();
  }, [navigate]);

  return <div className='text-center p-4'>Redirecting...</div>;
}

export default AuthCallbackRedirect;
