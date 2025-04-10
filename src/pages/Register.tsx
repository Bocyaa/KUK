import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

import AuthTitle from '../components/ui/AuthTitle';
import InputLabel from '../components/ui/InputLabel';
import SwitchAuthLink from '../components/ui/SwitchAuthLink';
import Input from '../components/ui/Input';
import SubmitButton from '../components/ui/SubmitButton';
import AuthDivider from '../components/ui/AuthDivider';
import Logo from '../components/ui/Logo';
import { NavLink, useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const isFormValid = email.trim() !== '' && password.trim().length >= 6;

  const navigate = useNavigate();

  async function handleRegistration(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('User already registered')) {
        setMessage('email');
      } else {
        setMessage(error.message);
      }
    } else {
      navigate('/complete-profile');
    }
  }

  async function handleGoogleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    console.log(error);
  }

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Logo />
          <AuthTitle>Create a new account</AuthTitle>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleRegistration} className='space-y-6'>
            <div>
              <InputLabel>Email address</InputLabel>
              <div className='mt-2'>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  placeholder='name@example.com'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                {message === 'email' && (
                  <span className='text-xs pl-2 text-red-600'>
                    An account with this email already exists. Please{' '}
                    <NavLink
                      to='/login'
                      className='text-blue-500 hover:text-blue-500'
                    >
                      login
                    </NavLink>{' '}
                    instead.
                  </span>
                )}
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
                    name='password'
                    type='password'
                    placeholder='New password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    top={true}
                  />
                </div>
                <div className='rounded-bl rounded-br border-b border-l border-r border-gray-300'>
                  <Input
                    id='passwordConfirm'
                    name='password'
                    type='password'
                    placeholder='Confirm new password'
                    required
                    autoComplete='current-password'
                    bottom={true}
                  />
                </div>
              </div>
            </div>

            <div>
              <SubmitButton label='Continue' disabled={!isFormValid} />
            </div>

            <AuthDivider
              providers={['google', 'apple']}
              onClickHandlers={{ google: handleGoogleSignIn }}
            />
          </form>

          <SwitchAuthLink
            question='Already a member?'
            linkText='Login'
            to='login'
          />
        </div>
      </div>
    </>
  );
}

export default Register;
