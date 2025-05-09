import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { useEffect } from 'react';
import FormSection from '../form/FormSection';
import BackSecondaryCard from '../controllers/BackSecondaryCard';
import CategoryPicker from './CategoryPicker';
import { Ingredient } from '@app/types/recipe';
import PricePicker from './PricePicker';

type Props = {
  form: {
    ingredients: Ingredient[];
    categories: string[];
    price: number;
    isPrivate: false;
  };
  updateForm: (fields: Partial<Props['form']>) => void;
  onBack: () => void;
  onSubmit: () => void;
};

function CreateRecipeStep3({ form, updateForm, onBack, onSubmit }: Props) {
  const {
    // setIsDirty,
    setLabelLeft,
    setLabelRight,
    setOnLeftClick,
    setOnRightClick,
  } = useFormConfirm();

  useEffect(() => {
    setLabelLeft('Step 2');
    setLabelRight('Done');
    setOnLeftClick(() => onBack);
    setOnRightClick(() => onSubmit);
  }, [
    setLabelLeft,
    setLabelRight,
    setOnLeftClick,
    setOnRightClick,
    onSubmit,
    onBack,
  ]);

  return (
    <div className="mt-14 flex flex-col gap-5">
      {/* Categories Picker */}
      <CategoryPicker form={form} updateForm={updateForm} />
      <PricePicker form={form} updateForm={updateForm} />

      {/* Price Picker */}
      <FormSection>
        <BackSecondaryCard>Is private checkbox</BackSecondaryCard>
      </FormSection>
    </div>
  );
}

export default CreateRecipeStep3;
