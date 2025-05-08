import QuantityStepper from '@app/components/ingredients/QuantityStepper';
import { Ingredient } from '@app/types/recipe';
import { useEffect, useState } from 'react';
import BackSecondaryCard from '../controllers/BackSecondaryCard';

type CaloryPickerProps = {
  form: {
    ingredients: Ingredient[];
    portion: number;
    time: number;
    calory: number;
  };
  updateForm: (fields: Partial<CaloryPickerProps['form']>) => void;
};

function CaloryPicker({ form, updateForm }: CaloryPickerProps) {
  const [calory, setCalory] = useState(form.portion || 0);

  useEffect(() => {
    if (form.calory !== calory) {
      setCalory(form.calory || 0);
    }
  }, [form.calory, calory]);

  function handleCaloryChange(value: number) {
    setCalory(value);
    updateForm({ calory: value });
  }

  return (
    <BackSecondaryCard>
      <span className="pl-1 text-gray-500">
        Calories <span className="text-xs text-gray-400">(kcal / portion)</span>
      </span>
      <QuantityStepper
        value={calory}
        onChange={handleCaloryChange}
        incVal={50}
        decVal={50}
      />
    </BackSecondaryCard>
  );
}

export default CaloryPicker;
