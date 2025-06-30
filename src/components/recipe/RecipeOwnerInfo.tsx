import Avatar from '@app/components/settings/Avatar';
import { formatCreatedAt } from '@app/shared/utility/formatCreatedAt';

interface RecipeOwnerInfoProps {
  owner: {
    avatar_url: string;
    username: string;
  };
  createdAt: string;
  onFollowClick?: () => void;
  isFollowing?: boolean;
}

function RecipeOwnerInfo({
  owner,
  createdAt,
  onFollowClick,
  isFollowing,
}: RecipeOwnerInfoProps) {
  return (
    <div className="flex w-full items-center gap-3 px-3">
      <div>
        <Avatar src={owner.avatar_url} size={32} />
      </div>

      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-ios-gray6">
            {owner.username}
          </span>
          <span className="text-xs text-ios-gray5">
            {formatCreatedAt(createdAt)}
          </span>
        </div>

        <button
          className="rounded-lg border border-ios-gray5/60 px-3"
          onClick={onFollowClick}
        >
          <span className="text-sm font-medium text-ios-gray5">
            {isFollowing ? 'Following' : 'Follow'}
          </span>
        </button>
      </div>
    </div>
  );
}

export default RecipeOwnerInfo;
