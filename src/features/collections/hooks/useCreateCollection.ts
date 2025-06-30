import { useAuth } from '@app/shared/contexts/hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvalidateCollectionsPreview } from './useGetCollectionsPreview';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@app/shared/lib/supabaseClient';

export function useCreateCollection() {
  const [isLoading, setIsLoading] = useState(false);

  const { session } = useAuth();
  const invalColPrev = useInvalidateCollectionsPreview();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function createCollection(name: string, description: string | null = null) {
    if (!session?.user) return null;

    setIsLoading(true);

    try {
      // 1. Check if collection with the same name exists
      const { data: existing, error: checkError } = await supabase
        .from('collections')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('name', name)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existing) {
        setIsLoading(false);
        return null;
      }

      // 2. Create the collection
      const { data: newCollection, error: createError } = await supabase
        .from('collections')
        .insert({
          user_id: session.user.id,
          name,
          description,
        })
        .select()
        .single();

      if (createError) throw createError;

      invalColPrev();

      setIsLoading(false);
      return newCollection;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return null;
    }
  }

  async function addRecipesToCollection(collectionId: string, recipeIds: string[]) {
    if (recipeIds.length === 0) {
      invalColPrev();
      queryClient.invalidateQueries({
        queryKey: ['collectionRecipes', collectionId],
      });
      navigate(`/recipes/collection/${collectionId}`);
      return;
    }

    setIsLoading(true);

    try {
      const recordsToInsert = recipeIds.map((id) => ({
        collection_id: collectionId,
        recipe_id: id,
      }));

      const { error } = await supabase
        .from('recipe_collections')
        .insert(recordsToInsert);

      if (error) throw error;

      invalColPrev();

      queryClient.invalidateQueries({
        queryKey: ['collectionRecipes', collectionId, session?.user?.id],
      });

      navigate(`/recipes/collection/${collectionId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { createCollection, addRecipesToCollection, isLoading };
}
