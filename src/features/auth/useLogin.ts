import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface MutationFnProps {
  email: string;
  password: string;
}

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: MutationFnProps) =>
      loginApi({
        email,
        password,
      }),
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password are incorrect!');
    },
  });

  return { login, isPending };
}
