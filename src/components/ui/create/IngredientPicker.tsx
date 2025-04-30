import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

type IngredientPickerProps = {
  form: {
    title: string;
    description?: string;
    difficulty: string;
    image?: string;
  };
  updateForm: (fields: Partial<IngredientPickerProps['form']>) => void;
  onIngredientsChange?: (ingredients: Ingredient[]) => void;
};

function IngredientPicker({
  form,
  updateForm,
  onIngredientsChange,
}: IngredientPickerProps) {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('g');
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const units = [
    { label: 'g', value: 'g' },
    { label: 'kg', value: 'kg' },
    { label: 'ml', value: 'ml' },
    { label: 'l', value: 'l' },
    { label: 'pcs', value: 'pcs' },
    { label: 'tbsp', value: 'tbsp' },
    { label: 'tsp', value: 'tsp' },
  ];

  const inc = () => setQuantity((q) => q + 1);
  const dec = () => setQuantity((q) => Math.max(1, q - 1));

  function resetInputs() {
    setQuantity(1);
    setUnit('g');
    setName('');
  }

  function emitChange(list: Ingredient[]) {
    if (onIngredientsChange) onIngredientsChange(list);
  }

  function addIngredient() {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newIngredients = [
      ...ingredients,
      { name: trimmedName, quantity, unit },
    ];

    setIngredients(newIngredients);
    emitChange(newIngredients);
    resetInputs();
  }

  function removeIngredient(index: number) {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    emitChange(newIngredients);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  }

  return (
    <div className="w-full max-w-xl space-y-4">
      <div className="pb-2">
        <span>Ingredients</span>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center overflow-hidden rounded-xl border">
            <button className="h-8 w-8 rounded-none" onClick={dec}>
              <span className="">-</span>
            </button>
            <span className="w-8 select-none px-3 text-center">{quantity}</span>
            <button className="h-8 w-8 rounded-none" onClick={inc}>
              <span className="">+</span>
            </button>
          </div>

          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            {units.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Add ingredient..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-w-[8rem] flex-1"
          />

          <button onClick={addIngredient}>Add</button>
        </div>

        {ingredients.length > 0 && (
          <div className="space-y-1">
            {ingredients.map((ing, i) => (
              <div
                key={`${ing.name}-${i}`}
                className="flex items-center justify-between rounded-xl bg-slate-100 p-2"
              >
                <span className="truncate font-medium">
                  {ing.quantity} {ing.unit} x {ing.name}
                </span>
                <button onClick={() => removeIngredient(i)}>
                  <XMarkIcon className="y-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default IngredientPicker;
