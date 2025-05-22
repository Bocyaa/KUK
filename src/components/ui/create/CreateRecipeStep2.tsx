import Ingredient from '@app/types/IngredientType';

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
};

function CreateRecipeStep2({ form, updateForm }: Props) {
  return (
    <div className="mb-12 mt-16 flex flex-col gap-4">
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
