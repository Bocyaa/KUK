import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { useEffect, useState } from 'react';
import IngredientPicker from './IngredientPicker';
import FormSection from '../form/FormSection';

type Props = {
  form: {
    title: string;
    description?: string;
    difficulty: string;
    image?: string;
  };
  updateForm: (fields: Partial<Props['form']>) => void;
  onNext: () => void;
  onBack: () => void;
};

function CreateRecipeStep2({ form, updateForm, onNext, onBack }: Props) {
  const {
    setIsDirty,
    setLabelLeft,
    setLabelRight,
    setOnLeftClick,
    setOnRightClick,
  } = useFormConfirm();

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
    <div className="mt-14">
      <FormSection>
        <IngredientPicker form={form} updateForm={updateForm} />
      </FormSection>
    </div>
  );
}

/* TODO: Ingredients */
/* TODO: Time Picker */
/* TODO: Price Picker */
/* TODO: Calory Picker */
/* TODO: Portion Picker */
/* TODO: Is Private Checkbox */
/* TODO: Categories picker */

export default CreateRecipeStep2;
