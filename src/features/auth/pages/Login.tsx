import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import toast from 'react-hot-toast';

import Input from '@app/components/ui/Input';
import SubmitButton from '@app/components/ui/SubmitButton';
import SwitchAuthLink from '@app/components/ui/SwitchAuthLink';
import AuthDivider from '@app/components/ui/AuthDivider';

import { validateForm } from '@app/features/auth/hooks/validateAuthForm';
import { useLogin } from '@app/features/auth/hooks/useLogin';
import { useGoogleAuth } from '@app/features/auth/hooks/useGoogleAuth';
import { useAppleAuth } from '@app/features/auth/hooks/useAppleAuth';
import AuthLayout from '@app/features/auth/components/AuthLayout';
import AuthHeader from '@app/features/auth/components/AuthHeader';
import AuthCard from '@app/features/auth/components/AuthCard';
import AuthCardHeader from '@app/features/auth/components/AuthCardHeader';
import AuthCardBody from '@app/features/auth/components/AuthCardBody';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [extendedLoading, setExtendedLoading] = useState(false);

  const { login, isPending } = useLogin();
  const { signInWithGoogle } = useGoogleAuth();
  const { signInWithApple } = useAppleAuth();

  // Ensure loading indicator shows for at least 300ms
  useEffect(() => {
    if (isPending) {
      setExtendedLoading(true);
    } else if (!isPending && extendedLoading) {
      const timer = setTimeout(() => {
        setExtendedLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isPending, extendedLoading]);

  const isFormValid = validateForm(email, password);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });

    setEmail('');
    setPassword('');
  }

  async function handleGoogleSignIn() {
    const { error } = await signInWithGoogle();
    if (error) toast.error('Something went wrong. Please try again.');
  }

  async function handleAppleSignIn() {
    const { error } = await signInWithApple();
    if (error) toast.error('Something went wrong. Please try again.');
  }

  return (
    <AuthLayout>
      <AuthHeader title="KÜK" />

      <AuthCard>
        <AuthCardHeader title="Log in" />
        <AuthCardBody>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Email"
                id="email"
                type="email"
                autoComplete="email"
                placeholder="hello@example.com"
                required
                disabled={isPending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                eye={true}
                disabled={isPending}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <SubmitButton
                  label="Continue"
                  disabled={!isFormValid}
                  isLoading={extendedLoading || isPending}
                />
              </div>

              <div className="flex w-full justify-center pb-2 pt-1 text-sm">
                <NavLink
                  to="/forgot-password"
                  className="tracking-wide hover:underline dark:text-[#e3e3e3]"
                >
                  I forgot my password
                </NavLink>
              </div>

              <AuthDivider
                providers={['google', 'apple']}
                onClickHandlers={{
                  google: handleGoogleSignIn,
                  apple: handleAppleSignIn,
                }}
                label="or log in with"
              />
            </div>
          </form>
        </AuthCardBody>
      </AuthCard>

      <SwitchAuthLink
        question="Don't have an account?"
        linkText="Sign up here!"
        to="register"
      />
    </AuthLayout>
  );
}

export default Login;
