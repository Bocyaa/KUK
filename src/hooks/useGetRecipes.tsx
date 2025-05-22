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
    queryKey: ['recipes'], // Unique key for caching
    queryFn: fetchRecipes, // Function to fetch data
    staleTime: Infinity, // Cache data for Infinity
    gcTime: Infinity, // Keep unused data in cache for Infinity
  });
}

// Helper to invalidate recipes cache
export function useInvalidateRecipes() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['recipes'] });
}
