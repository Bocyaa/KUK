import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { useEffect } from 'react';
import IngredientPicker from '@app/components/ingredients/IngredientPicker';
import { Ingredient } from '@app/types/recipe';

type Props = {
  form: {
    title: string;
    description: string;
    ingredients: Ingredient[];
  };
  updateForm: (fields: Partial<Props['form']>) => void;
  onNext: () => void;
  onBack: () => void;
};

function CreateRecipeStep2({ form, updateForm, onNext, onBack }: Props) {
  const {
    // setIsDirty,
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
      <IngredientPicker form={form} updateForm={updateForm} />
    </div>
  );
}

/* TODO: Portion Picker */
/* TODO: Time Picker */
/* TODO: Calory Picker */

/* TODO: Price Picker */
/* TODO: Is Private Checkbox */
/* TODO: Categories picker */

export default CreateRecipeStep2;
