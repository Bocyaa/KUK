import { useState } from 'react';
import Select from '@app/components/ingredients/Select';
import FormSection from '@app/components/form/FormSection';
import QuantityStepper from './QuantityStepper';

import AddItemButton from './AddItemButton';
import IngredientList from './IngredientList';
import Ingredient from '@app/shared/types/IngredientTypes';
import Input from '../ui/Input';

type IngredientPickerProps = {
  form: {
    ingredients: Ingredient[];
  };
  updateForm: (fields: Partial<IngredientPickerProps['form']>) => void;
};

function IngredientPicker({ form, updateForm }: IngredientPickerProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('g');
  const [ingredients, setIngredients] = useState(form.ingredients);

  const units = [
    { label: 'gram', value: 'g' },
    { label: 'kilogram', value: 'kg' },
    { label: 'milliliter', value: 'ml' },
    { label: 'liter', value: '𝓁' },
    { label: 'pieces', value: 'pcs' },
    { label: 'tablespoon', value: 'tbsp' },
    { label: 'teaspoon', value: 'tsp' },
  ];

  function resetInputs() {
    setQuantity(0);
    setUnit('g');
    setName('');
  }

  function addIngredient() {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newIngredients = [...ingredients, { name: trimmedName, quantity, unit }];

    setIngredients(newIngredients);
    updateForm({ ingredients: newIngredients });

    resetInputs();
  }

  function updateIngredientComment(index: number, comment: string) {
    const newIngredients = ingredients.map((ing, i) =>
      i === index ? { ...ing, comment } : ing,
    );

    setIngredients(newIngredients);
    updateForm({ ingredients: newIngredients });
  }

  function removeIngredient(index: number) {
    const newIngredients = ingredients.filter((_, i) => i !== index);

    setIngredients(newIngredients);
    updateForm({ ingredients: newIngredients });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (quantity !== 0 && name) {
        addIngredient();
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <FormSection className="gap-1">
        <div className="mb-2 flex flex-col gap-3 pb-3">
          <Input
            id="ingredients"
            label="Ingredients"
            placeholder={
              ingredients.length === 0
                ? 'e.g., Olive oil or Garlic cloves'
                : 'Ingredient name...'
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="z-10 flex items-center justify-between rounded-xl border border-[#e6e6e6] bg-[#f9f9f9] px-1 py-1 dark:border-transparent dark:bg-[#2c2c2e]">
            <QuantityStepper
              incVal={['g', 'ml'].includes(unit) ? 100 : 1}
              decVal={['g', 'ml'].includes(unit) ? 100 : 1}
              value={quantity}
              onChange={setQuantity}
            />

            <Select value={unit} onChange={setUnit} options={units} />

            <AddItemButton
              disabled={!name || quantity === 0}
              onClick={addIngredient}
            />
          </div>
        </div>

        {form.ingredients.length > 0 && (
          <IngredientList
            items={ingredients}
            onRemove={removeIngredient}
            onUpdateComment={updateIngredientComment}
          />
        )}
      </FormSection>
    </div>
  );
}

export default IngredientPicker;
