import { useEffect } from 'react';

import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { Ingredient } from '@app/types/IngredientType';

import IngredientPicker from '@app/components/ingredients/IngredientPicker';
import PortionPicker from './PortionPicker';
import FormSection from '../form/FormSection';
import TimePicker from './TimePicker';
import CaloryPicker from './CaloryPicker';

type Props = {
  form: {
    ingredients: Ingredient[];
    portion: number;
    time: number;
    calory: number;
  };
  updateForm: (fields: Partial<Props['form']>) => void;
  onNext: () => void;
  onBack: () => void;
};

function CreateRecipeStep2({ form, updateForm, onNext, onBack }: Props) {
  const { setLabelLeft, setLabelRight, setOnLeftClick, setOnRightClick } =
    useFormConfirm();

  useEffect(() => {
    setLabelLeft('Step 1');
    setLabelRight('Step 3');
    setOnLeftClick(() => onBack);
    setOnRightClick(() => onNext);
  }, [
    setLabelLeft,
    setLabelRight,
    setOnLeftClick,
    setOnRightClick,
    onNext,
    onBack,
  ]);

  return (
    <div className="mb-12 mt-14 flex flex-col gap-5">
      <IngredientPicker form={form} updateForm={updateForm} />

      <FormSection className="gap-3">
        <PortionPicker form={form} updateForm={updateForm} />
        <CaloryPicker form={form} updateForm={updateForm} />
        <TimePicker form={form} updateForm={updateForm} />
      </FormSection>
    </div>
  );
}

export default CreateRecipeStep2;
