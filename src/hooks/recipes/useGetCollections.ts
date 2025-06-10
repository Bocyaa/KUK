import { useAuth } from '@app/contexts/hooks/useAuth';
import { supabase } from '@app/lib/supabaseClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';

async function fetchCollections(userId: string) {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

// Returns the current user's recipes and keeps the fresh for a day.
export function useGetCollections() {
  const userId = useAuth().session?.user?.id;

  return useQuery({
    queryKey: ['collections', userId],
    queryFn: () => fetchCollections(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 60 * 24,
  });
}

// Helper to pre-fetch outside React component
export function PrefetchCollections(userId: string) {
  const qc = useQueryClient();
  return qc.prefetchQuery({
    queryKey: ['collections', userId],
    queryFn: () => fetchCollections(userId),
    staleTime: 1000 * 60 * 60 * 24,
  });
}

// Helper to invalidate recipes cache
export function useInvalidateCollections() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ['collections'] });
  };
}
