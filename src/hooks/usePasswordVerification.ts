import { useState } from 'react';
import { checkCurrentPassword } from '@app/hooks/useCheckCurrentPassword';

export function usePasswordVerification(email: string) {
  const [value, setValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [message, setMessage] = useState('');

  async function verify() {
    setIsVerifying(true);
    const [result] = await Promise.all([
      checkCurrentPassword(email, value),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);
    setIsVerifying(false);
    setValue('');
    setIsVerified(!!result);
    if (!result) {
      setMessage('Incorrect current password, try again!');
      setAttemptsLeft((a) => a - 1);
    } else {
      setMessage('Successfully verified. Set a new password.');
    }
  }

  return {
    value,
    setValue,
    isVerifying,
    isVerified,
    attemptsLeft,
    message,
    setMessage,
    verify,
  };
}
