import { supabase } from '@app/shared/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function fetchUserById(userId: string) {
  const { data, error } = await supabase
    .from('public_profiles') // Use the view instead
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export function useGetUserById(userId: string | undefined) {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserById(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
