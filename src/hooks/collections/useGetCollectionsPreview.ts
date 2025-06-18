import { useAuth } from '@app/contexts/hooks/useAuth';
import { supabase } from '@app/lib/supabaseClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CollectionPreview } from '@app/types/CollectionTypes';

async function fetchCollectionsPreview(
  userId: string,
): Promise<CollectionPreview[]> {
  const { data, error } = await supabase
    .from('collections')
    .select(
      `
      id,
      name,
      description,
      created_at,
      recipe_collections(
        recipes(
          image_url
        )
      )
    `,
    )
    .eq('user_id', userId);

  if (error) throw error;

  // Transform data to limit to 4 images per collection
  return (
    data?.map((collection) => {
      // flatten all the recipes arrays, grab up to 4 images
      const images =
        collection.recipe_collections
          ?.flatMap((rc) => rc.recipes) // rc.recipes is an array
          .filter((r) => r.image_url) // drop any w/o image
          .slice(0, 4) // limit to 4
          .map((r) => ({ image_url: r.image_url })) || []; // shape for CollectionPreview

      return {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        created_at: collection.created_at,
        recipe_collections: images,
      };
    }) || []
  );
}

// Returns the current user's collections with their names, ids and up to 4 recipe images each.
export function useGetCollectionsPreview() {
  const userId = useAuth().session?.user?.id;

  return useQuery({
    queryKey: ['collections', userId],
    queryFn: () => fetchCollectionsPreview(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 60 * 24,
  });
}

// Helper to pre-fetch outside React component
export function PrefetchCollections(userId: string) {
  const qc = useQueryClient();
  return qc.prefetchQuery({
    queryKey: ['collections', userId],
    queryFn: () => fetchCollectionsPreview(userId),
    staleTime: 1000 * 60 * 60 * 24,
  });
}

// Helper to invalidate collections cache
export function useInvalidateCollectionsPreview() {
  const qc = useQueryClient();
  const userId = useAuth().session?.user?.id;

  return () => {
    qc.invalidateQueries({
      queryKey: ['collections', userId],
      refetchType: 'all',
    });
  };
}
