// src/hooks/useRecipes.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@app/contexts/hooks/useAuth.ts';
import { supabase } from '@app/lib/supabaseClient';

async function fetchRecipes(userId: string) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', userId); 
    
  if (error) throw error;
  return data;
}

/** Returns the current user’s recipes and keeps them fresh for a day. */
export function useGetRecipes() {
  const userId = useAuth().session?.user?.id;

  return useQuery({
    queryKey: ['recipes', userId],
    queryFn: () => fetchRecipes(userId!), 
    enabled: !!userId, // wait for auth
    staleTime: 1000 * 60 * 60 * 24, // 24 h
  });
}

/** Optional helper if you ever want to pre-fetch outside React components. */
export function PrefetchRecipes(userId: string) {
  const qc = useQueryClient();
  return qc.prefetchQuery({
    queryKey: ['recipes', userId],
    queryFn: () => fetchRecipes(userId),
    staleTime: 1000 * 60 * 60 * 24,
  });
}

// Helper to invalidate recipes cache
export function useInvalidateRecipes() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['recipes'] });
  };
}