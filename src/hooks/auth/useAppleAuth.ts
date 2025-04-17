import { AuthError } from '@supabase/supabase-js';
import { supabase } from '@app/lib/supabaseClient';

export function useAppleAuth() {
  async function signInWithApple() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            scope: 'name email',
            // additional scopes
          },
        },
      });

      if (error) {
        return { error: error as AuthError | null };
      }

      return { data, error: null };
    } catch (e) {
      return { error: e as AuthError };
    }
  }

  return { signInWithApple };
}
