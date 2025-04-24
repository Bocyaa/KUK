import { useCallback, useEffect, useState } from 'react';
import FormInput from '../../form/FormInput';
import FormSection from '../../form/FormSection';
import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { useAuth } from '@app/contexts/hooks/useAuth';
import { useResetPassword } from '@app/hooks/auth/useResetPassword';
import AnimatedMessage from '../../AnimatedMessage';
import PasswordInputWithVerification from './PasswordInputWithVerification';
import { usePasswordVerification } from '@app/hooks/usePasswordVerification';

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
    resetPassword(passConfirm);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPassNew('');
    setPassConfirm('');
    setIsLoading(false);
  }, [resetPassword, passConfirm, setIsLoading]);

  useEffect(() => {
    if (isVerified && passNew === passConfirm && passConfirm.length >= 6) {
      setLabel('Update');
      setIsDirty(true);
      setOnConfirm(() => handleConfirm);
    } else {
      setIsDirty(false);
      setOnConfirm(null);
    }
  }, [isVerified, passNew, passConfirm, handleConfirm, setIsDirty, setOnConfirm, setLabel]);

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

  // TODO: Need to work on colors
  // TODO: Avoid signout after updating password
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

        <FormInput
          label="New Password"
          name="newPass"
          value={passNew}
          onChange={handleChange}
          disabled={!isVerified}
        />

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
