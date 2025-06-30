import { AuthError } from '@supabase/supabase-js';
import { supabase } from '@app/shared/lib/supabaseClient';

export function useGoogleAuth() {
  async function signInWithGoogle() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      return { error: error as AuthError | null };
    } catch (e) {
      return { error: e as AuthError };
    }
  }

  return { signInWithGoogle };
}
