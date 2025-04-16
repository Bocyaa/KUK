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

      // Check if the email already exists in the profiles table
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('email, authProvider')
        .eq('email', email)
        .maybeSingle();

      if (fetchError) {
        toast.error('Unexpected error occurred, please try again.');
        return;
      }

      if (existingProfile) {
        if (
          existingProfile.authProvider === 'google' ||
          existingProfile.authProvider === 'apple'
        ) {
          const formattedProvider =
            existingProfile.authProvider.charAt(0).toUpperCase() +
            existingProfile.authProvider.slice(1);
          toast.error(
            `An account with this email exists. Please sign in via ${formattedProvider}.`
          );
          return;
        }

        // If the provider is 'email'
        const { error: supabaseError } =
          await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
          });

        if (supabaseError) {
          setError(supabaseError.message);
          toast.error('Faile to send reset link. Please try again.');
          return;
        }

        toast.success(
          'Reset link sent! Check your email inbox and spam folder.'
        );
      } else {
        toast.error("This email address doesn't exists!");
      }
    } catch {
      setError('An unexpected error occurred!');
      toast.error('An unexpected error occurred!');
    } finally {
      setIsPending(false);
    }
  }

  return { sendResetLink, isPending, error };
}
