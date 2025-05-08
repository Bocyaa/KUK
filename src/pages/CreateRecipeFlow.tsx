import { useState } from 'react';
import AddRecipeStep1 from '@app/components/ui/create/CreateRecipeStep1';
import AddRecipeStep2 from '@app/components/ui/create/CreateRecipeStep2';
import AddRecipeStep3 from '@app/components/ui/create/CreateRecipeStep3';
import { Ingredient } from '@app/types/recipe';

type RecipeFormData = {
  image: string;
  title: string;
  description: string;
  difficulty: string;
  ingredients: Ingredient[];
  categories: string[];
  time: number;
  price: number;
  calory: number;
  portion: number;
  isPrivate: boolean;
};

const initialForm: RecipeFormData = {
  image: '',
  title: '',
  description: '',
  difficulty: 'Beginner',
  ingredients: [],
  categories: [],
  time: 0,
  price: 0,
  calory: 0,
  portion: 0,
  isPrivate: false,
};

function AddRecipeFlow() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RecipeFormData>(initialForm);

  function updateForm(fields: Partial<RecipeFormData>) {
    setForm((prev) => ({ ...prev, ...fields }));
  }

  function handleNext() {
    setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((s) => s - 1);
  }

  function handleSubmit() {
    // Submit the form data
    console.log(form);
  }

  return (
    <div>
      {step === 1 && (
        <AddRecipeStep1
          form={form}
          updateForm={updateForm}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <AddRecipeStep2
          form={form}
          updateForm={updateForm}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <AddRecipeStep3
          form={form}
          updateForm={updateForm}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default AddRecipeFlow;
