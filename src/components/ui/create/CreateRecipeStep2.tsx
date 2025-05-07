import { useEffect, useState } from 'react';
import { EyeOff } from 'lucide-react';

import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { Ingredient } from '@app/types/recipe';

import IngredientPicker from '@app/components/ingredients/IngredientPicker';
import PortionPicker from './PortionPicker';
import FormSection from '../form/FormSection';
import TimePicker from './TimePicker';
import CaloryPicker from './CaloryPicker';

type Props = {
  form: {
    title: string;
    description: string;
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
  const [isShowDetails, setIsShowDetails] = useState(true);

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
    <div className="mt-14 flex flex-col gap-5">
      <IngredientPicker form={form} updateForm={updateForm} />
      <FormSection className="gap-3">
        {!isShowDetails ? (
          <button
            onClick={() => setIsShowDetails(true)}
            className="pl-1 text-left text-[#0094f6]"
          >
            <span>Show More Options</span>
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsShowDetails(false)}
              className="flex items-center gap-2 pl-1 text-[#0094f6]"
            >
              <span>Hide</span>
              <EyeOff className="h-4 w-4" />
            </button>
            <PortionPicker form={form} updateForm={updateForm} />
            <CaloryPicker form={form} updateForm={updateForm} />
            <TimePicker form={form} updateForm={updateForm} />
          </>
        )}
      </FormSection>
    </div>
  );
}

export default CreateRecipeStep2;

/* TODO: Calory Picker */
