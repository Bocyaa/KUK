import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import toast from 'react-hot-toast';
import { supabase } from '@app/lib/supabaseClient';

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

      const { data: profile } = await supabase
        .from('profiles')
        .select('username, birthdate, country')
        .eq('id', session.user.id)
        .single();

      if (type === 'login') {
        if (profile?.username && profile?.birthdate && profile?.country) {
          navigate('/recipes');
          return;
        } else {
          navigate('/complete-profile');
          return;
        }
      }

      if (type === 'signup') {
        if (session.user.email_confirmed_at) {
          // toast.success('Email verified successfully!', {
          //   id: 'email-verified',
          // });

          if (profile?.username && profile?.birthdate && profile?.country) {
            navigate('/recipes');
            return;
          } else {
            navigate('/complete-profile');
            return;
          }
        } else {
          toast.error('Email verification failed. Please try again.');
          navigate('/confirm-email');
        }
      }

      if (profile?.username && profile?.birthdate && profile?.country) {
        navigate('/recipes');
      } else {
        navigate('/complete-profile');
      }
    }

    handleCallback();
  }, [navigate, type]);

  return <div className="p-4 text-center">Redirecting...</div>;
}

export default AuthCallbackRedirect;
