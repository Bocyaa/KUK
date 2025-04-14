import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';

export function useResetPassword() {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  async function resetPassword(newPassword: string) {
    try {
      setIsPending(true);

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Password reset successful!');
      navigate('/login');
    } catch {
      toast.error('Failed to reset password');
    } finally {
      setIsPending(false);
    }
  }

  return { resetPassword, isPending };
}
