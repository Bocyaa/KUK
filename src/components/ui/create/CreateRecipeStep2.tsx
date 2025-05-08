import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { Ingredient } from '@app/types/recipe';

import IngredientPicker from '@app/components/ingredients/IngredientPicker';
import PortionPicker from './PortionPicker';
import FormSection from '../form/FormSection';
import TimePicker from './TimePicker';
import CaloryPicker from './CaloryPicker';
import ShowHide from './ShowHide';

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
  const [isShowMore, setIsShowMore] = useState(true);

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
    <div className="mb-12 mt-14 flex flex-col gap-5">
      <IngredientPicker form={form} updateForm={updateForm} />

      <FormSection className={`${isShowMore && 'gap-3'}`}>
        <ShowHide
          type={isShowMore ? 'hide' : 'show'}
          onClick={() => setIsShowMore(!isShowMore)}
        />

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={
            isShowMore
              ? { height: 'auto', opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
          className="flex flex-col gap-3"
        >
          <PortionPicker form={form} updateForm={updateForm} />
          <CaloryPicker form={form} updateForm={updateForm} />
          <TimePicker form={form} updateForm={updateForm} />
        </motion.div>
      </FormSection>
    </div>
  );
}

export default CreateRecipeStep2;
