import RecipeTypes from '@app/types/RecipeTypes';
import { formatCookTime } from '@app/utility/formatCookTime';
import Avatar from '../settings/Avatar';
import { HeartIcon } from '../Icons/HeartIcon';
import { BookmarkIcon } from '../Icons/BookmarkIcon';
import { formatCreatedAt } from '@app/utility/formatCreatedAt';

interface RecipeImageCardTypes {
  recipe: RecipeTypes;
}

function RecipeImageCard({ recipe }: RecipeImageCardTypes) {
  return (
    <div className="mx-3 flex flex-col">
      {recipe.image_url && (
        <img
          src={recipe.image_url}
          alt={recipe.title + 'image'}
          className="z-1 w-full rounded-t-3xl"
        />
      )}

      <div className="relative rounded-b-3xl border-x border-b border-dashed border-[#e3e3e3]/20">
        <div
          className="flex flex-col gap-5 rounded-b-3xl px-2 py-2"
          style={{
            background: 'var(--theme-bg-gradient)',
          }}
        >
          <div>
            {/* Title & Description & Price */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <h1 className="no-scrollbar overflow-x-auto whitespace-nowrap text-2xl font-bold text-ios-gray6">
                  {recipe.title}
                </h1>
                {recipe.price > 0 && (
                  <div className="ml-3 rounded-full bg-black/40 px-2 font-semibold text-ios-gray6 shadow-sm">
                    €{recipe.price}
                  </div>
                )}
              </div>
              <h2 className="line-clamp-2 leading-5 text-ios-gray5/70">
                {recipe.description}
              </h2>
            </div>

            <div className="my-5 flex flex-col gap-2">
              {/* Details Bar */}
              <div className="flex items-center gap-1 text-white">
                <span className="rounded-xl bg-neutral-200/20 px-2 py-1 text-sm font-medium">
                  {recipe.difficulty}
                </span>

                <div className="flex items-baseline rounded-xl bg-neutral-200/20 px-2 py-1 text-sm">
                  <span className="font-medium">{recipe.calories}</span>
                  <span className="pl-1 text-xs">kcal</span>
                </div>

                <span className="rounded-xl bg-neutral-200/20 px-2 py-1 text-sm">
                  {formatCookTime(recipe.cook_time)}
                </span>
              </div>

              <span className="pl-1 text-xs text-ios-gray5/70">
                Created{' '}
                <span className="font-medium">
                  {formatCreatedAt(recipe.created_at)}
                </span>
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {/* Owner */}
            <div className="flex items-center justify-center rounded-full bg-white/20 p-1 shadow-sm">
              <div className="flex gap-2">
                <Avatar src={recipe.owner.avatar_url} size={32} />
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center rounded-2xl bg-white py-2 shadow-sm">
              <span className="font-semibold">Cook</span>
            </div>
            <div className="flex items-center justify-center rounded-full bg-white/20 p-1 shadow-sm">
              <HeartIcon className="h-7 w-8 text-white" />
            </div>
            <div className="flex-shrink-0 rounded-full bg-white/20 px-1 pt-1.5 shadow-sm">
              <BookmarkIcon className="h-7 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeImageCard;
