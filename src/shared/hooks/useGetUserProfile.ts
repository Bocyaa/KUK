import { supabase } from '@app/shared/lib/supabaseClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';

async function fetchUserProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('No user signed in.');

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
}

export function useGetUserProfile() {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: Infinity, // never refetch unless manually invalidated
    gcTime: Infinity,
  });
}

// Helper to update profile and invalidate cache
export function useInvalidateUserPofile() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['userProfile'] });
}
