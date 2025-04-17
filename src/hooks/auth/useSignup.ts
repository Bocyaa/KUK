import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '@app/lib/supabaseClient';

export async function handleSignup(
  e: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  navigate: NavigateFunction
) {
  e.preventDefault();

  // Check if the email already exists in the profiles table
  const { data: existingProfile, error: fetchError } = await supabase
    .from('profiles')
    .select('email')
    .eq('email', email)
    .maybeSingle();

  if (fetchError) {
    toast.error('Unexpected error occurred, please try again.');
    return;
  }

  if (existingProfile) {
    toast.error(
      'An account with this email already exists. Please login instead.'
    );
    return;
  }

  // Proceed with sign up since no profile exists with the given email
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback?type=signup`,
    },
  });

  if (error) {
    if (error.message.includes('User already registered')) {
      toast.error(
        'An account with this email already exists. Please login instead.'
      );
    } else {
      toast.error('Something went wrong. Please try again.');
    }
    return;
  }

  if (data.user && !data.user.email_confirmed_at) {
    navigate('/confirm-email');
  } else {
    navigate('/complete-profile');
  }
}
