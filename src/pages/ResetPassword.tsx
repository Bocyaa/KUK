import { useState } from 'react';
import { useResetPassword } from '../features/auth/useResetPassword';
import toast from 'react-hot-toast';
import Logo from '../components/ui/Logo';
import AuthTitle from '../components/ui/AuthTitle';
import InputLabel from '../components/ui/InputLabel';
import Input from '../components/ui/Input';
import SubmitButton from '../components/ui/SubmitButton';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPassword, isPending } = useResetPassword();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    await resetPassword(password);
  }

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Logo />
        <AuthTitle>Reset Your Password</AuthTitle>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleSubmit}>
          <div className='space-y-6'>
            <div>
              <InputLabel>New Password</InputLabel>
              <div className='mt-2'>
                <Input
                  id='password'
                  type='password'
                  required
                  disabled={isPending}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <InputLabel>Confirm Password</InputLabel>
              <div className='mt-2'>
                <Input
                  id='passwordConfirm'
                  type='password'
                  required
                  disabled={isPending}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <SubmitButton
              label='Reset Password'
              disabled={!password || !confirmPassword || isPending}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
