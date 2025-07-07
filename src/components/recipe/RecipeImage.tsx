import RecipeTypes from '@app/shared/types/RecipeTypes';
import Avatar from '../settings/Avatar';
import { useNavigate } from 'react-router-dom';

interface RecipeImageProps {
  recipe: RecipeTypes;
}

function RecipeImage({ recipe }: RecipeImageProps) {
  const navigate = useNavigate();
  const ownerId = recipe.user_id;

  function handleOwnerClick() {
    navigate(ownerId);
  }

  return (
    <div className="relative">
      {recipe.image_url && (
        <img
          src={recipe.image_url}
          alt={recipe.title + 'image'}
          className="z-1 w-full rounded-t-3xl"
        />
      )}

      {/* Owner */}
      <button
        className="absolute right-0 top-0 m-2 flex items-center justify-center rounded-full bg-black/30 py-2 pl-3 pr-2 shadow-lg backdrop-blur-sm"
        onClick={handleOwnerClick}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">{recipe.owner.username}</span>
          <Avatar src={recipe.owner.avatar_url} size={2} />
        </div>
      </button>
    </div>
  );
}

export default RecipeImage;
