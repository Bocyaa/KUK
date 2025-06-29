import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import InputLabel from '@app/components/ui/InputLabel';
import Input from '@app/components/ui/Input';
import SubmitButton from '@app/components/ui/SubmitButton';

import { useForgotPassword } from '@app/hooks/auth/useForgotPassword';
import AuthHeader from '@app/components/auth/AuthHeader';
import AuthLayout from '@app/components/auth/AuthLayout';
import AuthCard from '@app/components/auth/AuthCard';
import AuthCardHeader from '@app/components/auth/AuthCardHeader';
import AuthCardBody from '@app/components/auth/AuthCardBody';

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
    <AuthLayout>
      <AuthHeader title="KÜK" />

      <AuthCard>
        <AuthCardHeader title="Reset Password" />
        <AuthCardBody>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <InputLabel>Email</InputLabel>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    disabled={isPending}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex w-full border-b dark:border-[#3b3f4e]"></div>

              <div className="flex flex-row-reverse">
                <SubmitButton
                  label="Recover Password"
                  disabled={!email || isPending}
                />
              </div>
            </div>
          </form>
        </AuthCardBody>
      </AuthCard>

      <div className="flex items-center gap-1 text-sm">
        <span className="my-5 text-[#171823BF] dark:text-[#bab9bc]">
          Back to
        </span>
        <NavLink to={`/login`} className="">
          <span className="font-medium text-[#0094f6] dark:text-[#0094f6]">
            Log in
          </span>
        </NavLink>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
