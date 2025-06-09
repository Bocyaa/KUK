import Avatar from '../settings/Avatar';
import { HeartIcon } from '../Icons/HeartIcon';
import { BookmarkIcon } from '../Icons/BookmarkIcon';

interface RecipeActionsProps {
  ownerAvatarUrl: string;
  onCook?: () => void;
  onLike?: () => void;
  onBookmark?: () => void;
}

function RecipeActions({
  ownerAvatarUrl,
  onCook,
  onLike,
  onBookmark,
}: RecipeActionsProps) {
  return (
    <div className="flex gap-2">
      {/* Owner */}
      <div className="flex items-center justify-center rounded-full bg-white/20 p-1 shadow-sm">
        <div className="flex gap-2">
          <Avatar src={ownerAvatarUrl} size={32} />
        </div>
      </div>

      <button
        className="flex flex-1 items-center justify-center rounded-2xl bg-white py-2 shadow-sm"
        onClick={onCook}
      >
        <span className="font-semibold">Cook</span>
      </button>

      <button
        className="flex items-center justify-center rounded-full bg-white/20 p-1 shadow-sm"
        onClick={onLike}
      >
        <HeartIcon className="h-7 w-8 text-white" />
      </button>

      <button
        className="flex-shrink-0 rounded-full bg-white/20 px-1 pt-1.5 shadow-sm"
        onClick={onBookmark}
      >
        <BookmarkIcon className="h-7 w-8 text-white" />
      </button>
    </div>
  );
}

export default RecipeActions;
