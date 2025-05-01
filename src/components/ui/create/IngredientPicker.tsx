import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from './ingredient-picker/Button';
import FormInput from '../form/FormInput';
import Select from './ingredient-picker/Select';
import FormSection from '../form/FormSection';

type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

type IngredientPickerProps = {
  form: {
    title: string;
    ingredients: Ingredient[];
    description: string;
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
    { label: 'Gram', value: 'g' },
    { label: 'Kilogram', value: 'kg' },
    { label: 'Milliliter', value: 'ml' },
    { label: 'Liter', value: 'l' },
    { label: 'Pieces', value: 'pcs' },
    { label: 'Tablespoon', value: 'tbsp' },
    { label: 'Teaspoon', value: 'tsp' },
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
  //
  return (
    <div className="flex flex-col gap-4">
      <FormSection>
        <div className="flex flex-col gap-3">
          <FormInput
            label="Ingredients"
            placeholder="Add ingredient ..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center justify-between rounded-xl border bg-gray-100 px-1 py-1 dark:border-[#6f6f6f21] dark:bg-[#29292b]">
            <div className="flex items-center overflow-hidden rounded-lg border bg-white">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-none"
                onClick={dec}
              >
                <MinusIcon className="h-3 w-3" />
              </Button>
              <input
                type="number"
                value={quantity}
                min="1"
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  // Allow empty value while typing
                  if (e.target.value === '') {
                    setQuantity('' as any); // temporarily allow empty string
                    return;
                  }

                  const value = Number(e.target.value);
                  setQuantity(value < 0 ? 0 : value); // allow zero while typing
                }}
                onBlur={(e) => {
                  // When input loses focus, ensure value is at least 1
                  const value = Number(e.target.value);
                  setQuantity(!value || value < 1 ? 1 : value);
                }}
                className="w-12 text-center focus:outline-none"
              />
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-none"
                onClick={inc}
              >
                <PlusIcon className="h-3 w-3" />
              </Button>
            </div>
            <span className="font-thin text-gray-300 dark:text-[#6f6f6f64]">
              |
            </span>

            <Select value={unit} onChange={setUnit} options={units} />

            <span className="font-thin text-gray-300 dark:text-[#6f6f6f64]">
              |
            </span>

            <button
              disabled={name === ''}
              type="button"
              className={`rounded-lg border px-6 py-1 transition-all duration-200 ${
                name !== ''
                  ? 'bg-white text-[#0094f6] dark:border-[#6f6f6f3c] dark:bg-[#161617] dark:text-[#f3f3f3]'
                  : 'border-transparent bg-transparent text-gray-500 dark:text-[#6f6f6f]'
              }`}
              onClick={addIngredient}
            >
              <PlusIcon className={`w-6 ${name === '' && 'text-gray-300'}`} />
            </button>
          </div>
        </div>
      </FormSection>

      {ingredients.length > 0 && (
        <FormSection>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">{form.title}</span>
            <span className="text-sm text-gray-400">{form.description}</span>

            <div className="border-t">
              {ingredients.map((ing, i) => (
                <div
                  key={`${ing.name}-${i}`}
                  className="mt-2 flex items-center justify-between rounded-xl border bg-gray-100 px-1 py-1 dark:border-[#6f6f6f21] dark:bg-[#29292b]"
                >
                  <div className="flex min-w-0 gap-1">
                    <div className="flex flex-none items-center overflow-hidden rounded-lg border bg-white">
                      <span className="px-5 py-1">{ing.name}</span>
                    </div>
                    <div className="flex flex-none items-center overflow-hidden rounded-lg border bg-white px-4 py-1">
                      <span className="font-medium">{ing.quantity}</span>
                      <span className="font-light text-gray-500">
                        {ing.unit}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 items-center overflow-hidden rounded-lg">
                      {/* <input
                        type="text"
                        className="w-full bg-transparent px-4 py-1 text-xs placeholder:text-gray-400 focus:outline-none"
                        placeholder="add comment"
                      /> */}
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeIngredient(i)}
                    className="rounded-lg border bg-white"
                  >
                    <TrashIcon className="h-3 w-3 text-red-700" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </FormSection>
      )}
    </div>
  );
}

export default IngredientPicker;
