import type Ingredient from '@app/types/IngredientTypes';
import IngredientRow from './IngredientRow';
import BackSecondaryCard from '../ui/BackSecondaryCard';

interface Props {
  items: Ingredient[];
  onRemove: (index: number) => void;
  onUpdateComment: (index: number, comment: string) => void;
}

function IngredientList({ items, onRemove, onUpdateComment }: Props) {
  return (
    <BackSecondaryCard justify="start" height="full">
      <div className="flex w-full flex-col gap-1">
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
    </BackSecondaryCard>
  );
}

export default IngredientList;
