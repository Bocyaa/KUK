import AuthTitle from '../components/ui/AuthTitle';
import InputLabel from '../components/ui/InputLabel';
import Input from '../components/ui/Input';
import SubmitButton from '../components/ui/SubmitButton';
import SwitchAuthLink from '../components/ui/SwitchAuthLink';
import Logo from '../components/ui/Logo';
import { useState } from 'react';
import AuthDivider from '../components/ui/AuthDivider';
import { useQueryClient } from '@tanstack/react-query';

import { useLogin } from '../features/auth/useLogin';

function Login() {
  // const { login, isLoading } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.trim() !== '' && password.trim().length >= 6;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;
    // login({ email, password });
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
                    name='email'
                    type='email'
                    autoComplete='email'
                    placeholder='example@gmail.com'
                    required
                    // disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <InputLabel>Password</InputLabel>
                  <div className='text-sm'>
                    <a href='#' className='text-blue-500 hover:text-blue-500'>
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
                    // disabled={isLoading}
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
                // onClickHandlers={{ google: handleLogin }}
              />
            </div>
          </form>

          <SwitchAuthLink
            question='Not a member?'
            linkText='Register'
            to='register'
          />
        </div>
      </div>
    </>
  );
}

export default Login;
