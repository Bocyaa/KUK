import { useState } from 'react';
import { useForgotPassword } from '../features/auth/useForgotPassword';
import InputLabel from '../components/ui/InputLabel';
import Input from '../components/ui/Input';
import SubmitButton from '../components/ui/SubmitButton';
import AuthTitle from '../components/ui/AuthTitle';
import Logo from '../components/ui/Logo';
import SwitchAuthLink from '../components/ui/SwitchAuthLink';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { sendResetLink, isPending } = useForgotPassword();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    await sendResetLink(email);
    setEmail('');
    navigate('/login');
  }

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Logo />
        <AuthTitle>Forgot Password</AuthTitle>
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
              <SubmitButton
                label='Send Reset Link'
                disabled={!email || isPending}
              />
            </div>

            <SwitchAuthLink question='Back to' linkText='Log in' to='login' />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
