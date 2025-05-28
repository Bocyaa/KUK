import { supabase } from '@app/lib/supabaseClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Function to fetch recipes from Supabase
async function fetchRecipes() {
  const { data, error } = await supabase.from('recipes').select('*');
  if (error) throw error;
  return data;
}

// Custom hook to get recipes with caching
export function useGetRecipes() {
  return useQuery({
    queryKey: ['recipes'], // Consistent query key for caching
    queryFn: fetchRecipes,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

// Helper to invalidate recipes cache
export function useInvalidateRecipes() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['recipes'] });
}
