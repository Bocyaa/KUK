import { useAuth } from '@app/contexts/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export function useDeleteRecipe() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteRecipes = async (recipeIds: string | string[]) => {
    const userId = session?.user?.id;
    if (!userId) return;
  };
}
