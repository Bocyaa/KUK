import { supabase } from '@app/lib/supabaseClient';

async function checkCurrentPassword(email: string, password: string): Promise<boolean> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  return !error;
}

export { checkCurrentPassword };
