import QuantityStepper from '@app/components/ingredients/QuantityStepper';
import { Ingredient } from '@app/types/recipe';
import { useEffect, useState } from 'react';

type PortionPickerProps = {
  form: {
    title: string;
    description: string;
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
    <div className="flex items-center justify-between gap-2 rounded-xl border bg-gray-100 px-1 py-1 dark:border-[#6f6f6f21] dark:bg-[#29292b]">
      <span className="pl-1 text-gray-500">Portions</span>
      <QuantityStepper value={portion} onChange={handlePortionChange} />
    </div>
  );
}

export default PortionPicker;
