import QuantityStepper from '@app/components/ingredients/QuantityStepper';
import { Ingredient } from '@app/types/recipe';
import { useEffect, useState } from 'react';
import BackSecondaryCard from '../controllers/BackSecondaryCard';

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
    <BackSecondaryCard>
      <span className="pl-1 text-gray-500">Portions</span>
      <QuantityStepper value={portion} onChange={handlePortionChange} />
    </BackSecondaryCard>
  );
}

export default PortionPicker;
