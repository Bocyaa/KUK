import { supabase } from '@app/lib/supabaseClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Function to fetch a single recipe by ID from Supabase
async function fetchRecipe(recipeId: string) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', recipeId)
    .single(); // Use single() to get one record instead of an array

  if (error) throw error;
  return data;
}

// Custom hook to get a single recipe by ID with caching
export function useGetRecipe(recipeId: string | undefined) {
  return useQuery({
    queryKey: ['recipe', recipeId], // Unique key for caching with recipe ID
    queryFn: () => fetchRecipe(recipeId!), // Function to fetch data
    enabled: !!recipeId, // Only run query if recipeId exists
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });
}

// TODO: think about cashing

// Helper to invalidate specific recipe cache
export function useInvalidateRecipe() {
  const queryClient = useQueryClient();
  return (recipeId: string) =>
    queryClient.invalidateQueries({ queryKey: ['recipe', recipeId] });
}

// Helper to invalidate all recipe-related caches
export function useInvalidateAllRecipes() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['recipes'] });
    queryClient.invalidateQueries({ queryKey: ['recipe'] });
  };
}
