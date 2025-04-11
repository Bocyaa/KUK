import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';

export async function handleSignup(
  e: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  navigate: NavigateFunction
) {
  e.preventDefault();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('User already registered')) {
      toast.error(
        'An account with this email already exists. Please login instead.'
      );
    } else {
      toast.error('Something went wrong. Please try again.');
      return;
    }
  }

  navigate('/complete-profile');
}
