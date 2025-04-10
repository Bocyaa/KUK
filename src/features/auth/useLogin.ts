import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';

interface MutationFnProps {
  email: string;
  password: string;
}

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
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
      // use toast library here
    },
  });

  return { login, isLoading };
}
