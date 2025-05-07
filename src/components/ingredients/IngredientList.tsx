import type { Ingredient } from '@app/types/recipe';
import IngredientRow from './IngredientRow';

interface Props {
  items: Ingredient[];
  onRemove: (index: number) => void;
  onUpdateComment: (index: number, comment: string) => void;
  className?: string;
}

function IngredientList({
  items,
  onRemove,
  onUpdateComment,
  className,
}: Props) {
  return (
    <div className={` ${className}`}>
      {items.map((ing, i) => (
        <IngredientRow
          key={`${ing.id ?? ing.name}-${i}`}
          ingredient={ing}
          index={i}
          onRemove={() => onRemove(i)}
          onUpdateComment={onUpdateComment}
        />
      ))}
    </div>
  );
}

export default IngredientList;
