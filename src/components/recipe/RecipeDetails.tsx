import RecipeTypes from '@app/shared/types/RecipeTypes';
import { formatCookTime } from '@app/shared/utility/formatCookTime';
import { formatCreatedAt } from '@app/shared/utility/formatCreatedAt';

interface RecipeDetailsProps {
  recipe: RecipeTypes;
}

function RecipeDetails({ recipe }: RecipeDetailsProps) {
  return (
    <div className="my-5 flex flex-col gap-2">
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
        <span className="font-medium">{formatCreatedAt(recipe.created_at)}</span>
      </span>
    </div>
  );
}

export default RecipeDetails;
