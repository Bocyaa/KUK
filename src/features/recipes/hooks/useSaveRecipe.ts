import { useState, useEffect } from 'react';
import { supabase } from '@app/shared/lib/supabaseClient';
import { useAuth } from '@app/shared/contexts/hooks/useAuth';
import toast from 'react-hot-toast';
import { useInvalidateCollectionRecipes } from '@app/features/collections/hooks/useGetCollectionRecipes';
import { useInvalidateCollectionsPreview } from '@app/features/collections/hooks/useGetCollectionsPreview';

export function useSaveRecipe(recipeId?: string) {
  const userId = useAuth().session?.user?.id;
  const [isSaved, setIsSaved] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const invalidateCollectionRecipes = useInvalidateCollectionRecipes();
  const invalidateCollectionsPreview = useInvalidateCollectionsPreview();

  useEffect(() => {
    if (!userId || !recipeId) return;

    async function checkSaved() {
      const { data: collection, error: collectionError } = await supabase
        .from('collections')
        .select('id')
        .eq('user_id', userId)
        .eq('name', 'Saved')
        .maybeSingle();

      if (collectionError) return;

      if (!collection) {
        setIsSaved(false);
        return;
      }

      const { data: saved, error } = await supabase
        .from('recipe_collections')
        .select('recipe_id')
        .eq('collection_id', collection.id)
        .eq('recipe_id', recipeId)
        .maybeSingle();

      if (!error) setIsSaved(!!saved);
    }

    checkSaved();
  }, [userId, recipeId]);

  const toggleSave = async () => {
    if (!userId || !recipeId) return;

    setIsPending(true);

    const { data: collection, error } = await supabase
      .from('collections')
      .select('id')
      .eq('user_id', userId)
      .eq('name', 'Saved')
      .maybeSingle();

    if (error) {
      toast.error('Failed to access Saved collection.');
      setIsPending(false);
      return;
    }

    let finalCollection = collection;

    if (!finalCollection) {
      const { data: created, error: createError } = await supabase
        .from('collections')
        .insert({ user_id: userId, name: 'Saved' })
        .select('id')
        .single();

      if (createError) {
        toast.error('Failed to create Saved collection.');
        setIsPending(false);
        return;
      }

      finalCollection = created;
    }

    if (isSaved) {
      const { error: deleteError } = await supabase
        .from('recipe_collections')
        .delete()
        .eq('collection_id', finalCollection.id)
        .eq('recipe_id', recipeId);

      if (deleteError) toast.error('Failed to unsave recipe.');
      else setIsSaved(false);
    } else {
      const { error: insertError } = await supabase
        .from('recipe_collections')
        .insert({ collection_id: finalCollection.id, recipe_id: recipeId });

      if (insertError) toast.error('Failed to save recipe.');
      else setIsSaved(true);
    }

    // Pass the specific collection ID and force a refetch
    invalidateCollectionRecipes(finalCollection.id, true);
    invalidateCollectionsPreview();

    setIsPending(false);
  };

  return { isSaved, toggleSave, isPending };
}
