import CategoryPicker from './CategoryPicker';
import Ingredient from '@app/types/IngredientType';
import PricePicker from './PricePicker';
import RecipeVisibilityToggle from './RecipeVisibilityToggle';

type Props = {
  form: {
    ingredients: Ingredient[];
    categories: string[];
    price: number;
    isPrivate: boolean;
  };
  updateForm: (fields: Partial<Props['form']>) => void;
};

function CreateRecipeStep3({ form, updateForm }: Props) {
  return (
    <div className="mb-12 mt-16 flex flex-col gap-4">
      <CategoryPicker form={form} updateForm={updateForm} />
      <PricePicker form={form} updateForm={updateForm} />

      <RecipeVisibilityToggle form={form} updateForm={updateForm} />
    </div>
  );
}

export default CreateRecipeStep3;
