import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import Logo from '@app/components/ui/Logo';
import SubmitButton from '@app/components/ui/SubmitButton';
import InputLabel from '@app/components/ui/InputLabel';
import SwitchAuthLink from '@app/components/ui/SwitchAuthLink';

import { useAuth } from '@app/contexts/hooks/useAuth';
import { supabase } from '@app/lib/supabaseClient';

function ConfirmEmail() {
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [countdown, isTimerActive]);

  async function handleResendEmail() {
    if (!session?.user?.email) {
      toast.error('No email found. Please try logging in again.');
      navigate('/login');
      return;
    }

    setIsResending(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: session.user.email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?type=signup`,
      },
    });

    if (!error) {
      toast.success('Verification email has been resent.');
      setCountdown(30);
      setIsTimerActive(true);
    } else {
      toast.error('Failed to resend verification email.');
    }

    setIsResending(false);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Logo />

      <div className="flex flex-col gap-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Check your email
        </h2>
        <p className="mt-4 text-center text-gray-600">
          We've sent you a verification email. Please check your inbox or spam folder and click the
          link to verify your account.
        </p>
        <div className="mt-6 flex flex-col gap-3 text-center">
          {!isTimerActive && <InputLabel>Didn't receive the email?</InputLabel>}

          <div className="relative">
            {isTimerActive && (
              <>
                <div className="absolute top-2 w-full">
                  <div className="h-[2px] w-full bg-gray-200">
                    <div
                      className="h-full bg-black transition-all duration-1000 ease-linear"
                      style={{ width: `${(countdown / 30) * 100}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <SubmitButton
            label={
              isResending
                ? 'Sending...'
                : isTimerActive
                  ? `Resend available in ${countdown}s`
                  : 'Resend'
            }
            onClick={handleResendEmail}
            disabled={isResending || isTimerActive}
          />
        </div>
      </div>

      <SwitchAuthLink question="Back to" linkText="Log in" to="login" />
    </div>
  );
}

export default ConfirmEmail;
