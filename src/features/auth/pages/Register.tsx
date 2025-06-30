import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import SwitchAuthLink from '@app/components/ui/SwitchAuthLink';
import Input from '@app/components/ui/Input';
import SubmitButton from '@app/components/ui/SubmitButton';
import AuthDivider from '@app/components/ui/AuthDivider';

import { useGoogleAuth } from '@app/features/auth/hooks/useGoogleAuth';
import { validateForm } from '@app/features/auth/hooks/validateAuthForm';
import { handleSignup } from '@app/features/auth/hooks/useSignup';
import { useAppleAuth } from '@app/features/auth/hooks/useAppleAuth';
import AuthLayout from '@app/components/auth/AuthLayout';
import AuthHeader from '@app/components/auth/AuthHeader';
import AuthCardHeader from '@app/components/auth/AuthCardHeader';
import AuthCardBody from '@app/components/auth/AuthCardBody';
import AuthCard from '@app/components/auth/AuthCard';

function Register() {
  // Controlled input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [passwordConfirm, setPasswordConfirm] = useState('');

  // Custom hooks
  const navigate = useNavigate();
  const { signInWithGoogle } = useGoogleAuth();
  const { signInWithApple } = useAppleAuth();

  // FrontEnd form validation
  const isFormValid = validateForm(email, password); // passwordConfirm

  // SignUp via Email
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await handleSignup(e, email, password, navigate);
    } finally {
      // Ensure loading state persists for at least 300ms
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }

  // SignIn via Google
  async function handleGoogleSignIn() {
    const { error } = await signInWithGoogle();
    if (error) toast.error('Something went wrong. Please try again.');
  }

  // SignIn via Apple
  async function handleAppleSignIn() {
    const { error } = await signInWithApple();
    if (error) toast.error('Something went wrong. Please try again.');
  }

  return (
    <AuthLayout>
      <AuthHeader title="KÜK" />

      <AuthCard>
        <AuthCardHeader title="Sign up" />
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
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <Input
                  label="Password"
                  id="password"
                  type="password"
                  placeholder=""
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  eye={true}
                />
                <p className="mt-2 pl-2 text-xs text-[#74747b] dark:text-[#afafaf]">
                  Min 6 chars. Adding upper, lower & special chars increases
                  security.
                </p>
              </div>

              <div className="pb-2">
                <SubmitButton
                  label="Create account"
                  disabled={!isFormValid}
                  isLoading={isLoading}
                />
              </div>

              <AuthDivider
                providers={['google', 'apple']}
                onClickHandlers={{
                  google: handleGoogleSignIn,
                  apple: handleAppleSignIn,
                }}
                label="or sign up with"
              />
            </div>
          </form>
        </AuthCardBody>
      </AuthCard>

      <SwitchAuthLink
        question="Already have an account?"
        linkText="Log in here!"
        to="login"
      />
    </AuthLayout>
  );
}

export default Register;
