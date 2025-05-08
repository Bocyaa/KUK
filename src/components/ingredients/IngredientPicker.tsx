import { useState } from 'react';
import Select from '@app/components/ingredients/Select';
import FormInput from '@app/components/ui/form/FormInput';
import FormSection from '@app/components/ui/form/FormSection';
import QuantityStepper from './QuantityStepper';
import VerticalSep from '../ui/VerticalSep';
import AddItemButton from './AddItemButton';
import IngredientList from './IngredientList';
import { Ingredient } from '@app/types/recipe';
import ShowHide from '../ui/create/ShowHide';
import { motion } from 'framer-motion';

type IngredientPickerProps = {
  form: {
    ingredients: Ingredient[];
  };
  updateForm: (fields: Partial<IngredientPickerProps['form']>) => void;
};

function IngredientPicker({ form, updateForm }: IngredientPickerProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [unit, setUnit] = useState('g');
  const [ingredients, setIngredients] = useState(form.ingredients);
  const [isShowIngs, setIsShowIngs] = useState(true);

  const units = [
    { label: 'gram', value: 'g' },
    { label: 'kilogram', value: 'kg' },
    { label: 'milliliter', value: 'ml' },
    { label: 'liter', value: 'l' },
    { label: 'pieces', value: 'pcs' },
    { label: 'tablespoon', value: 'tbsp' },
    { label: 'teaspoon', value: 'tsp' },
  ];

  function resetInputs() {
    setQuantity(1);
    setUnit('g');
    setName('');
  }

  function addIngredient() {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newIngredients = [
      ...ingredients,
      { name: trimmedName, quantity, unit },
    ];

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
      addIngredient();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <FormSection className="gap-1">
        <div className="mb-3 flex flex-col gap-3 border-b pb-3">
          <FormInput
            autoFocus={ingredients.length !== 0 ? false : true}
            label="Ingredients"
            placeholder="Add ingredient ..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            // onBlur={addIngredient}
          />
          <div className="z-10 flex items-center justify-between rounded-xl border bg-gray-100 px-1 py-1 dark:border-[#6f6f6f21] dark:bg-[#29292b]">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <VerticalSep />
            <Select value={unit} onChange={setUnit} options={units} />
            <VerticalSep />
            <AddItemButton disabled={!name} onClick={addIngredient} />
          </div>
        </div>

        {form.ingredients.length > 0 && (
          <div className="flex flex-col gap-2">
            <ShowHide
              type={isShowIngs ? 'hide' : 'show'}
              onClick={() => setIsShowIngs(!isShowIngs)}
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                isShowIngs
                  ? { height: 'auto', opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <IngredientList
                items={ingredients}
                onRemove={removeIngredient}
                onUpdateComment={updateIngredientComment}
              />
            </motion.div>
          </div>
        )}
      </FormSection>
    </div>
  );
}

export default IngredientPicker;
