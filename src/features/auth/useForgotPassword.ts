import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';

export function useForgotPassword() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendResetLink(email: string) {
    try {
      setIsPending(true);
      setError(null);

      const { error: supabaseError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        });

      if (supabaseError) {
        setError(supabaseError.message);
        toast.error('Faile to send reset link. Please try again.');
        return;
      }

      toast.success('Reset link sent! Check your email.');
    } catch {
      setError('An unexpected error occurred!');
      toast.error('An unexpected error occurred!');
    } finally {
      setIsPending(false);
    }
  }

  return { sendResetLink, isPending, error };
}
