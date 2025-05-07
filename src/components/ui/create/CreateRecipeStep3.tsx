import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { useEffect } from 'react';

function CreateRecipeStep3({ form, updateForm, onBack, onSubmit }) {
  const {
    setIsDirty,
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

  return <div className="mt-14">CreateRecipeStep3</div>;
}

export default CreateRecipeStep3;

/* TODO: Price Picker */
/* TODO: Is Private Checkbox */
/* TODO: Categories picker */
