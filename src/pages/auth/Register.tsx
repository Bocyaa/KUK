import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import AuthTitle from '@app/components/ui/AuthTitle';
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
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // Custom hooks
  const navigate = useNavigate();
  const { signInWithGoogle } = useGoogleAuth();
  const { signInWithApple } = useAppleAuth();

  // FrontEnd form validation
  const isFormValid = validateForm(email, password, passwordConfirm);

  // SignUp via Email
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    await handleSignup(e, email, password, navigate);
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <InputLabel>Email</InputLabel>
              <div className="mt-1">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <InputLabel>Password</InputLabel>
              </div>
              <div className="mt-1">
                <div className="overflow-hidden rounded-tl-lg rounded-tr-lg border border-gray-300 dark:border-[#3b3f4e]">
                  <Input
                    id="password"
                    type="password"
                    placeholder="New password"
                    required
                    top={true}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="overflow-hidden rounded-bl-lg rounded-br-lg border-b border-l border-r border-gray-300 dark:border-[#3b3f4e]">
                  <Input
                    id="passwordConfirm"
                    type="password"
                    placeholder="Confirm new password"
                    required
                    bottom={true}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <SubmitButton label="Sign up" disabled={!isFormValid} />
            </div>

            <AuthDivider
              providers={['google', 'apple']}
              onClickHandlers={{
                google: handleGoogleSignIn,
                apple: handleAppleSignIn,
              }}
              label="or sign up with"
            />
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
