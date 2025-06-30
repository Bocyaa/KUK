import { ReactNode, useEffect, useState } from 'react';

import RecipeTypes from '@app/shared/types/RecipeTypes';
import Avatar from '../settings/Avatar';
import RecipeImage from './RecipeImage';
import RecipeHeader from './RecipeHeader';
import RecipeDetails from './RecipeDetails';

import { HeartIcon } from '../Icons/HeartIcon';
import { BookmarkIcon, BookmarkIconFilled } from '../Icons/BookmarkIcon';
import { useAuth } from '@app/shared/contexts/hooks/useAuth';
import { Pencil } from 'lucide-react';

interface RecipeImageCardTypes {
  recipe: RecipeTypes;
  isSaved?: boolean;
  onBookmarkToggle?: () => Promise<void>;
}

function RecipeImageCard({
  recipe,
  isSaved = false,
  onBookmarkToggle,
}: RecipeImageCardTypes) {
  const userId = useAuth()?.session?.user.id;
  const [optimisticSaved, setOptimisticSaved] = useState(isSaved);

  // Sync with prop changes only when component mounts or prop actually changes
  useEffect(() => {
    setOptimisticSaved(isSaved);
  }, [isSaved]);

  const handleBookmarkClick = async () => {
    // 1. Update UI instantly (optimistic update)
    setOptimisticSaved(!optimisticSaved);

    try {
      // 2. Wait for backend operation to complete
      await onBookmarkToggle?.();
    } catch (error) {
      // 3. Revert optimistic update if backend fails
      console.error('Bookmark toggle failed:', error);
      setOptimisticSaved(!optimisticSaved);
    }
  };

  const handlePencilClick = () => {
    //
  };

  return (
    <div className="mx-3 flex flex-col">
      <RecipeImage recipe={recipe} />

      <RecipeCardContainer>
        <RecipeContentPanel>
          <div>
            <RecipeHeader recipe={recipe} />

            <RecipeDetails recipe={recipe} />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {/* Owner */}
            <div className="flex items-center justify-center rounded-full bg-white/20 p-1 shadow-sm">
              <div className="flex gap-2">
                <Avatar src={recipe.owner.avatar_url} size={32} />
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center rounded-2xl bg-white py-2 shadow-sm dark:text-[#0d0d0d]">
              <span className="font-semibold">Cook</span>
            </div>

            <div className="flex items-center justify-center rounded-full bg-white/20 p-1 shadow-sm">
              <HeartIcon className="h-7 w-8 text-white" />
            </div>

            {recipe.user_id === userId ? (
              <PencilButton onClick={handlePencilClick} />
            ) : (
              <BookmarkButton
                onClick={handleBookmarkClick}
                optSaved={optimisticSaved}
              />
            )}
          </div>
        </RecipeContentPanel>
      </RecipeCardContainer>
    </div>
  );
}

export default RecipeImageCard;

interface ChildrenProp {
  children: ReactNode;
}

function RecipeCardContainer({ children }: ChildrenProp) {
  return (
    <div className="rounded-b-3xl border-x border-b border-dashed border-[#e3e3e3]/20 shadow-md">
      {children}
    </div>
  );
}

function RecipeContentPanel({ children }: ChildrenProp) {
  return (
    <div
      className="flex flex-col gap-5 rounded-b-3xl px-2 py-2"
      style={{
        background: 'var(--theme-bg-gradient)',
      }}
    >
      {children}
    </div>
  );
}

function BookmarkButton({
  onClick,
  optSaved,
}: {
  onClick: () => void;
  optSaved: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 rounded-full bg-white/20 px-1 shadow-sm"
    >
      {optSaved ? (
        <BookmarkIconFilled className="h-7 w-8 text-white" />
      ) : (
        <BookmarkIcon className="h-7 w-8 text-white" />
      )}
    </button>
  );
}

function PencilButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 rounded-full bg-white/20 px-1 shadow-sm"
    >
      <Pencil className="h-8 w-8 p-1 text-white" />
    </button>
  );
}
