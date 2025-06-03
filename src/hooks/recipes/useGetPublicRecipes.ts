import { useAuth } from '@app/contexts/hooks/useAuth';
import { supabase } from '@app/lib/supabaseClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';

async function fetchPublicRecipes(userId: string) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('is_private', false)
    .neq('user_id', userId);
    
  if (error) throw error;
  return data;
}

// Custom hook to get public recipes with caching
export function useGetPublicRecipes() {
  const userId = useAuth().session?.user?.id;
  
  return useQuery({
    queryKey: ['publicRecipes', userId], // Include userId in query key for proper caching
    queryFn: () => fetchPublicRecipes(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

// Helper to invalidate public recipes cache
export function useInvalidatePublicRecipes() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['publicRecipes'] });
  };
}
