import { supabase } from '@app/shared/lib/supabaseClient';

interface LoginProps {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}
