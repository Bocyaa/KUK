import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '@app/features/auth/services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { supabase } from '@app/shared/lib/supabaseClient';

interface MutationFnProps {
  email: string;
  password: string;
}

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: async ({ email, password }: MutationFnProps) => {
      // Perform login
      await loginApi({ email, password });

      // Fetch the session after login
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        throw new Error('User session not found');
      }

      return session;
    },
    onSuccess: () => {
      navigate('/auth/callback?type=login');
    },
    onError: () => {
      toast.error('Provided email or password are incorrect!');
    },
  });

  return { login, isPending };
}
