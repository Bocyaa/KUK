import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

import { supabase } from '@app/shared/lib/supabaseClient';
import Ingredient from '@app/shared/types/IngredientTypes';
import processImage from '@app/shared/utility/processImage';

import StepHeader from '@app/components/ui/StepHeader';
import AddRecipeStep1 from '@app/components/create/CreateRecipeStep1';
import AddRecipeStep2 from '@app/components/create/CreateRecipeStep2';
import AddRecipeStep3 from '@app/components/create/CreateRecipeStep3';
import { useInvalidateRecipes } from '@app/features/recipes/hooks/useGetUserRecipes';
import base64ToFile from '@app/shared/utility/base64ToFile';

type RecipeFormData = {
  image: string;
  imageFile: File | null;
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
  imageFile: null, // store actual image file here
  title: '',
  description: '',
  difficulty: 'Beginner',
  ingredients: [],
  categories: [],
  time: 0, // in minutes
  price: 0,
  calory: 0,
  portion: 0,
  isPrivate: true,
};

const STEPS_CONFIG = [
  { id: 1, label: 'Step 1' },
  { id: 2, label: 'Step 2' },
  { id: 3, label: 'Step 3' },
];

function AddRecipeFlow() {
  const [form, setForm] = useState<RecipeFormData>(() => {
    const saved = localStorage.getItem('recipeForm');
    return saved ? JSON.parse(saved) : initialForm;
  });
  const navigate = useNavigate();
  const invalidateRecipes = useInvalidateRecipes();

  // State for multi-step navigation
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('recipeStep');
    return savedStep ? JSON.parse(savedStep) : 1;
  });
  const [maxReachedStep, setMaxReachedStep] = useState(() => {
    const savedMaxStep = localStorage.getItem('recipeMaxStep');
    return savedMaxStep ? JSON.parse(savedMaxStep) : 1;
  });

  // Handler for clicking on step labels in the header
  const handleVisualStepClick = (stepId: number) => {
    if (stepId >= 1) {
      if (form.title !== '') {
        setStep(stepId);
      }
    }
  };

  // Handler for the Next/Create button in the header
  const handleHeaderNextOrCreateClick = () => {
    if (step < STEPS_CONFIG.length && form.title !== '') {
      // Call the existing handleNext to advance the form step
      handleNext();
    } else if (step === STEPS_CONFIG.length) {
      // If on the last step, call handleSubmit
      handleSubmit();
    }
  };

  // Modified to update maxReachedStep
  function handleNext() {
    setStep((s) => {
      const nextS = s + 1;
      if (nextS <= STEPS_CONFIG.length) {
        setMaxReachedStep((prevMax) => Math.max(prevMax, nextS));
        return nextS;
      }
      return s; // Don't go beyond the last step
    });
  }

  function updateForm(fields: Partial<RecipeFormData>) {
    setForm((prev) => ({ ...prev, ...fields }));
  }

  async function handleFileSelect(file: File | null) {
    if (!file) {
      setForm((prev) => ({ ...prev, imageFile: null, image: '' }));
      return;
    }

    try {
      // Show loading toast while processing
      toast.loading('Processing image...');

      // Process image to crop and optimize
      const processedFile = await processImage(file);

      // Read the processed file and convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setForm((prev) => ({
          ...prev,
          imageFile: processedFile,
          image: base64String, // Store base64 data URL for persistence
        }));
        toast.dismiss();
        // toast.success('Image processed successfully');
      };
      reader.readAsDataURL(processedFile);
    } catch (error) {
      console.error('Image processing failed:', error);
      toast.dismiss();
      toast.error('Failed to process image');
    }
  }

  async function handleSubmit() {
    try {
      // Get current user
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Check for authentication
      if (!session?.user) {
        toast.error('You need to be logged in to submit a recipe!');
        return;
      }

      // Start loading toast
      const loadingToast = toast.loading('Creating your recipe...');

      // Handle image upload to Supabase storage
      let imageUrl = '';

      // Check for either base64 image or imageFile
      if (form.imageFile || form.image) {
        let fileToUpload = form.imageFile;

        // If imageFile is null but we have base64 image (from localStorage), convert it
        if (!fileToUpload && form.image) {
          fileToUpload = base64ToFile(form.image);
        }

        if (fileToUpload) {
          // Generate unique filename
          // const fileExt = form.imageFile.name.split('.').pop();
          // const fileName = `${uuidv4()}.${fileExt}`;
          // const filePath = `${session.user.id}/${fileName}`;

          const fileExt = fileToUpload.name.split('.').pop() || 'jpg';
          const fileName = `${uuidv4()}.${fileExt}`;
          const filePath = `${session.user.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('recipe-images')
            .upload(filePath, fileToUpload);

          if (uploadError) {
            toast.dismiss(loadingToast);
            toast.error(`Failed to upload image: ${uploadError.message}`);
            return;
          }

          const { data } = supabase.storage
            .from('recipe-images')
            .getPublicUrl(filePath);

          imageUrl = data.publicUrl;
        }
      }

      const recipeData = {
        title: form.title,
        description: form.description || '',
        image_url: imageUrl, // permanent supabase URL
        ingredients: form.ingredients,
        cook_time: form.time,
        difficulty: form.difficulty,
        price: form.price,
        calories: form.calory,
        portions: form.portion,
        is_private: form.isPrivate,
        categories: form.categories,
        user_id: session.user.id,
      };

      const { data, error } = await supabase
        .from('recipes')
        .insert(recipeData)
        .select()
        .single();

      if (error) {
        toast.dismiss(loadingToast);
        toast.error(`Failed to submit recipe: ${error.message}`);
        console.error('Error submitting recipe:', error);
        return;
      }

      toast.dismiss(loadingToast);
      // toast.success('Recipe successfully created!');
      console.log('Recipe submitted:', data);

      handleReset(); // Clear form and reset step
      invalidateRecipes();
      navigate('/recipes');
    } catch (error) {
      console.error('Error in submission process:', error);
      toast.dismiss(); // Dismiss any active toast
      toast.error('An unexpected error occurred');
    }
  }

  function handleReset() {
    setForm(initialForm);
    localStorage.removeItem('recipeForm');
    localStorage.removeItem('recipeStep');
    localStorage.removeItem('recipeMaxStep');
    setStep(1);
    setMaxReachedStep(1);
  }

  useEffect(() => {
    const formForStorage = {
      ...form,
      imageFile: null,
    };
    localStorage.setItem('recipeForm', JSON.stringify(formForStorage));
  }, [form]);

  useEffect(() => {
    localStorage.setItem('recipeStep', JSON.stringify(step));
    localStorage.setItem('recipeMaxStep', JSON.stringify(maxReachedStep));
  }, [step, maxReachedStep]);

  return (
    <div className="px-4 py-2 pb-16">
      <StepHeader
        form={form}
        step={step}
        maxReachedStep={maxReachedStep}
        onReset={handleReset}
        onStepClick={handleVisualStepClick}
        onNextClick={handleHeaderNextOrCreateClick}
        disableNext={form.title === ''}
      />

      {step === 1 && (
        <AddRecipeStep1
          form={form}
          updateForm={updateForm}
          onFileSelect={handleFileSelect}
        />
      )}
      {step === 2 && <AddRecipeStep2 form={form} updateForm={updateForm} />}
      {step === 3 && <AddRecipeStep3 form={form} updateForm={updateForm} />}
    </div>
  );
}

export default AddRecipeFlow;
