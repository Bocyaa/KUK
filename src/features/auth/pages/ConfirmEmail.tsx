import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import SubmitButton from '@app/components/ui/SubmitButton';

import { supabase } from '@app/shared/lib/supabaseClient';
import AuthLayout from '@app/features/auth/components/AuthLayout';
import AuthHeader from '@app/features/auth/components/AuthHeader';
import AuthCard from '@app/features/auth/components/AuthCard';
import AuthCardHeader from '@app/features/auth/components/AuthCardHeader';
import AuthCardBody from '@app/features/auth/components/AuthCardBody';
import { useAuth } from '@app/shared/contexts/hooks/useAuth';

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
      // toast.success('Verification email has been resent.');
      setCountdown(30);
      setIsTimerActive(true);
    } else {
      toast.error('Failed to resend verification email.');
    }

    setIsResending(false);
  }

  return (
    <AuthLayout>
      <AuthHeader title="KÜK" />

      <AuthCard>
        <AuthCardHeader title="Check your email" />
        <AuthCardBody>
          <p className="mt-4 text-left text-gray-600 dark:text-[#e3e3e3]">
            We've sent you a verification email. Please check your inbox or spam
            folder and click the link to verify your account.
          </p>
        </AuthCardBody>
        <div className="mt-4 flex flex-col gap-3 border-t pt-3 text-center dark:border-[#424242]">
          {!isTimerActive && (
            <label className="text-xs font-medium tracking-wider dark:text-[#afafaf]">
              Didn't receive the email?
            </label>
          )}

          <div className="flex flex-row-reverse px-6 pb-4">
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
      </AuthCard>

      {/* <SwitchAuthLink question="Back to" linkText="Log in" to="login" /> */}

      <div className="mt-4 flex items-center gap-1 text-sm">
        <span className="my-5 text-[#171823BF] dark:text-[#bab9bc]">Back to</span>
        <NavLink to={`/login`} className="">
          <span className="font-medium text-[#0094f6] dark:text-[#0094f6]">
            Log in
          </span>
        </NavLink>
      </div>
    </AuthLayout>
  );
}

export default ConfirmEmail;
