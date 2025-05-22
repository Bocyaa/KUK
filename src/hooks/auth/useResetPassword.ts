import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@app/lib/supabaseClient';
import toast from 'react-hot-toast';

export function useResetPassword() {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  /**
   * @param newPassword - The new password to set
   * @param options - { logoutAfter?: boolean } (default: true)
   */
  async function resetPassword(
    newPassword: string,
    options?: { logoutAfter?: boolean },
  ) {
    const logoutAfter = options?.logoutAfter ?? true;

    try {
      setIsPending(true);

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (logoutAfter) {
        // toast.success('Password reset successful!');
        navigate('/login');
      } else {
        return true;
      }
    } catch {
      toast.error('Failed to reset password');
      return false;
    } finally {
      setIsPending(false);
    }
  }

  return { resetPassword, isPending };
}
