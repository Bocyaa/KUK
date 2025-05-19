import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import InputLabel from '@app/components/ui/InputLabel';
import SwitchAuthLink from '@app/components/ui/SwitchAuthLink';
import Input from '@app/components/ui/Input';
import SubmitButton from '@app/components/ui/SubmitButton';
import AuthDivider from '@app/components/ui/AuthDivider';

import { useGoogleAuth } from '@app/hooks/auth/useGoogleAuth';
import { validateForm } from '@app/hooks/auth/validateAuthForm';
import { handleSignup } from '@app/hooks/auth/useSignup';
import { useAppleAuth } from '@app/hooks/auth/useAppleAuth';
import AuthLayout from '@app/components/ui/auth/AuthLayout';
import AuthHeader from '@app/components/ui/auth/AuthHeader';
import AuthCardHeader from '@app/components/ui/auth/AuthCardHeader';
import AuthCardBody from '@app/components/ui/auth/AuthCardBody';
import AuthCard from '@app/components/ui/auth/AuthCard';

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
              <div>
                <InputLabel>Email</InputLabel>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="hello@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <InputLabel>Password</InputLabel>
                <div className="mt-1">
                  <Input
                    id="password"
                    type="password"
                    placeholder=""
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    eye={true}
                  />
                </div>
                <p className="mt-2 pl-2 text-xs text-[#74747b] dark:text-[#afafaf]">
                  Min 6 chars. Adding upper, lower & special chars increases
                  security.
                </p>
                {/* <div className="overflow-hidden rounded-bl-lg rounded-br-lg border-b border-l border-r border-gray-300 dark:border-[#3b3f4e]">
                  <Input
                    id="passwordConfirm"
                    type="password"
                    placeholder="Confirm new password"
                    required
                    bottom={true}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    eye={true}
                  />
                </div> */}
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
