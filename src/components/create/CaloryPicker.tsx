import QuantityStepper from '@app/components/ingredients/QuantityStepper';
import Ingredient from '@app/types/IngredientTypes';
import { useEffect, useState } from 'react';
import BackSecondaryCard from '../ui/BackSecondaryCard';
import HelperText from './HelperText';

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
    <>
      <BackSecondaryCard>
        <span className="pl-1 text-[#0d0d0d] dark:text-[#e3e3e3]">
          Calories{' '}
          <span className="text-xs text-[#5d5d5d] dark:text-[#afafaf]">
            (kcal / portion)
          </span>
        </span>
        <QuantityStepper
          value={calory}
          onChange={handleCaloryChange}
          incVal={50}
          decVal={50}
        />
      </BackSecondaryCard>

      <HelperText
        text="Set calories per portion to track intake and sort meals by calorie
        amount."
      />
    </>
  );
}

export default CaloryPicker;
