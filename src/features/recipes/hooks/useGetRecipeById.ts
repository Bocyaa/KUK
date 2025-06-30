import { supabase } from '@app/shared/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function fetchRecipeById(recipeId: string) {
  const { data, error } = await supabase
    .from('recipes')
    .select(
      `
      *,
      owner:public_profiles!recipes_user_id_fkey(username, avatar_url)
    `,
    )
    .eq('id', recipeId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw error;
  }
  return data;
}

export function useGetRecipeById(recipeId: string | undefined) {
  return useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => fetchRecipeById(recipeId!),
    enabled: !!recipeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
