import { useEffect, useState } from 'react';
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

// const initialForm: RecipeFormData = {
//   image: '',
//   title: 'Pancakes',
//   description: '',
//   difficulty: 'Intermediate',
//   ingredients: [
//     {
//       name: 'Eggs',
//       quantity: 3,
//       unit: 'pcs',
//       pricePerUnit: 0.2,
//     },
//     {
//       name: 'Sugar',
//       quantity: 3,
//       unit: 'tbsp',
//       pricePerUnit: 0.89,
//     },
//     {
//       name: 'Milk',
//       quantity: 250,
//       unit: 'ml',
//       pricePerUnit: 1.09,
//     },
//     {
//       name: 'Flour',
//       quantity: 140,
//       unit: 'g',
//       pricePerUnit: 0.59,
//     },
//     {
//       name: 'Boiled water',
//       quantity: 250,
//       unit: 'ml',
//       pricePerUnit: 0,
//     },
//     {
//       name: 'Plant Oil',
//       quantity: 20,
//       unit: 'ml',
//       pricePerUnit: 1.49,
//     },
//     {
//       name: 'Baking powder',
//       quantity: 0.5,
//       unit: 'tsp',
//       pricePerUnit: 8.06,
//     },
//   ],
//   categories: [],
//   time: 0,
//   price: 0,
//   calory: 0,
//   portion: 0,
//   isPrivate: false,
// };

function AddRecipeFlow() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RecipeFormData>(() => {
    const saved = localStorage.getItem('recipeForm');
    return saved ? JSON.parse(saved) : initialForm;
  });

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

  function handleReset() {
    setForm(initialForm);

    localStorage.removeItem('recipeForm');

    setStep(1);
  }

  useEffect(() => {
    localStorage.setItem('recipeForm', JSON.stringify(form));
  }, [form]);

  return (
    <div>
      {step === 1 && (
        <AddRecipeStep1
          form={form}
          updateForm={updateForm}
          onReset={handleReset}
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
