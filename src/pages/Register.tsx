import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import AuthTitle from '../components/ui/AuthTitle';
import InputLabel from '../components/ui/InputLabel';
import SwitchAuthLink from '../components/ui/SwitchAuthLink';
import Input from '../components/ui/Input';
import SubmitButton from '../components/ui/SubmitButton';
import AuthDivider from '../components/ui/AuthDivider';
import Logo from '../components/ui/Logo';

import { useGoogleAuth } from '../features/auth/useGoogleAuth';
import { validateForm } from '../features/auth/validateAuthForm';
import { handleSignup } from '../features/auth/useSignup';
import { useAppleAuth } from '../features/auth/useAppleAuth';

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
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Logo />
          <AuthTitle>Create a new account</AuthTitle>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <InputLabel>Email address</InputLabel>
              <div className='mt-2'>
                <Input
                  id='email'
                  type='email'
                  autoComplete='email'
                  placeholder='name@example.com'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <InputLabel>Password</InputLabel>
              </div>
              <div className='mt-2'>
                <div className='rounded-tl rounded-tr border border-gray-300'>
                  <Input
                    id='password'
                    type='password'
                    placeholder='New password'
                    required
                    top={true}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='rounded-bl rounded-br border-b border-l border-r border-gray-300'>
                  <Input
                    id='passwordConfirm'
                    type='password'
                    placeholder='Confirm new password'
                    required
                    bottom={true}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <SubmitButton label='Continue' disabled={!isFormValid} />
            </div>

            <AuthDivider
              providers={['google', 'apple']}
              onClickHandlers={{
                google: handleGoogleSignIn,
                apple: handleAppleSignIn,
              }}
            />
          </form>

          <SwitchAuthLink
            question='Already have an account?'
            linkText='Log in'
            to='login'
          />
        </div>
      </div>
    </>
  );
}

export default Register;
