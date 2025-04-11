import { useState } from 'react';
import toast from 'react-hot-toast';

import AuthTitle from '../components/ui/AuthTitle';
import InputLabel from '../components/ui/InputLabel';
import Input from '../components/ui/Input';
import SubmitButton from '../components/ui/SubmitButton';
import SwitchAuthLink from '../components/ui/SwitchAuthLink';
import Logo from '../components/ui/Logo';
import AuthDivider from '../components/ui/AuthDivider';

import { validateForm } from '../features/auth/validateAuthForm';
import { useLogin } from '../features/auth/useLogin';
import { useGoogleAuth } from '../features/auth/useGoogleAuth';
import { useAppleAuth } from '../features/auth/useAppleAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isPending } = useLogin();
  const { signInWithGoogle } = useGoogleAuth();
  const { signInWithApple } = useAppleAuth();

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
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Logo />
          <AuthTitle>Login to your account</AuthTitle>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit}>
            <div className='space-y-6'>
              <div>
                <InputLabel>Email address</InputLabel>
                <div className='mt-2'>
                  <Input
                    id='email'
                    type='email'
                    autoComplete='email'
                    placeholder='example@gmail.com'
                    disabled={isPending}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <InputLabel>Password</InputLabel>
                  <div className='text-sm'>
                    <a
                      href='#'
                      className='text-blue-500 hover:underline font-semibold'
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div className='mt-2'>
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    placeholder='•••••••••'
                    autoComplete='current-password'
                    required
                    disabled={isPending}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
            </div>
          </form>

          <SwitchAuthLink
            question="Don't have an account?"
            linkText='Sign up'
            to='register'
          />
        </div>
      </div>
    </>
  );
}

export default Login;
