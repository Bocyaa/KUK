import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { useEffect } from 'react';
import FormSection from '../form/FormSection';
import BackSecondaryCard from '../controllers/BackSecondaryCard';
import FormInput from '../form/FormInput';
import CategoryPicker from './CategoryPicker';

function CreateRecipeStep3({ form, updateForm, onBack, onSubmit }) {
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

      {/* Price Picker */}
      <FormSection>
        <BackSecondaryCard>Price Picker</BackSecondaryCard>
      </FormSection>

      {/* Price Picker */}
      <FormSection>
        <BackSecondaryCard>Is private checkbox</BackSecondaryCard>
      </FormSection>
    </div>
  );
}

export default CreateRecipeStep3;
