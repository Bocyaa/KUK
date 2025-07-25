import { useCallback, useEffect, useState } from 'react';
import FormInput from '../../../shared/components/form/FormInput';
import FormSection from '../../../shared/components/form/FormSection';
import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { useAuth } from '@app/contexts/hooks/useAuth';
import { useResetPassword } from '@app/hooks/auth/useResetPassword';
import AnimatedMessage from '../../ui/AnimatedMessage';
import PasswordInputWithVerification from './PasswordInputWithVerification';
import { usePasswordVerification } from '@app/hooks/auth/usePasswordVerification';

function UpdatePassword() {
  const [passNew, setPassNew] = useState('');
  const [passConfirm, setPassConfirm] = useState('');

  const { session } = useAuth();
  const { resetPassword } = useResetPassword();
  const { setIsDirty, setOnConfirm, setLabel, setIsLoading } = useFormConfirm();

  const {
    value: currPass,
    setValue: setCurrPass,
    isVerifying,
    isVerified,
    attemptsLeft,
    message,
    setMessage,
    verify,
  } = usePasswordVerification(session?.user?.email || '');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === 'newPass') setPassNew(value);
    if (name === 'confirmPass') setPassConfirm(value);
  }

  const handleConfirm = useCallback(async () => {
    setIsLoading(true);
    const isSuccess = await resetPassword(passConfirm, { logoutAfter: false });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setPassNew('');
    setPassConfirm('');
    setIsLoading(false);

    if (isSuccess) setMessage('Password has been successfully updated!');
  }, [resetPassword, passConfirm, setIsLoading, setMessage]);

  // Set Header Bar Properties Dynamically
  useEffect(() => {
    setLabel('Update');
    setOnConfirm(() => handleConfirm);

    if (isVerified && passNew === passConfirm && passConfirm.length >= 6) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [
    isVerified,
    passNew,
    passConfirm,
    handleConfirm,
    setIsDirty,
    setOnConfirm,
    setLabel,
  ]);

  // Message timer
  useEffect(() => {
    if (message !== '') {
      const timer = setTimeout(() => {
        setMessage('');
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  function isDisabled() {
    if (isVerified && passNew.length >= 6) return false;
    return true;
  }

  return (
    <div className="mt-16 flex w-full flex-col gap-5">
      <FormSection>
        <PasswordInputWithVerification
          value={currPass}
          onChange={(e) => setCurrPass(e.target.value)}
          onVerify={verify}
          isVerifying={isVerifying}
          isVerified={isVerified}
          attemptsLeft={attemptsLeft}
        />
      </FormSection>
      <FormSection>
        {/* TODO: Visual red/green icon feedback with dynamic password verification */}
        <FormInput
          label="New Password"
          name="newPass"
          value={passNew}
          onChange={handleChange}
          disabled={!isVerified}
        />

        {/* TODO: Visual red/green icon feedback with dynamic password verification */}
        <FormInput
          label="Confirm New Password"
          name="confirmPass"
          value={passConfirm}
          onChange={handleChange}
          disabled={isDisabled()}
        />
      </FormSection>

      <AnimatedMessage message={message} isSuccess={isVerified} />
    </div>
  );
}

export default UpdatePassword;
