import QuantityStepper from '@app/components/ingredients/QuantityStepper';
import Ingredient from '@app/types/IngredientTypes';
import { useEffect, useState } from 'react';
import BackSecondaryCard from '../ui/BackSecondaryCard';
import HelperText from './HelperText';

type PortionPickerProps = {
  form: {
    ingredients: Ingredient[];
    portion: number;
    time: number;
    calory: number;
  };
  updateForm: (fields: Partial<PortionPickerProps['form']>) => void;
};

function PortionPicker({ form, updateForm }: PortionPickerProps) {
  const [portion, setPortion] = useState(form.portion || 0);

  useEffect(() => {
    if (form.portion !== portion) {
      setPortion(form.portion || 0);
    }
  }, [form.portion, portion]);

  function handlePortionChange(value: number) {
    setPortion(value);
    updateForm({ portion: value });
  }

  return (
    <>
      <BackSecondaryCard>
        <span className="pl-1 text-[#0d0d0d] dark:text-[#e3e3e3]">
          Portions
        </span>
        <QuantityStepper value={portion} onChange={handlePortionChange} />
      </BackSecondaryCard>
      <HelperText
        text="Set portions to automatically update ingredient amounts. This makes it
        easy to scale the recipe."
      />
    </>
  );
}

export default PortionPicker;
