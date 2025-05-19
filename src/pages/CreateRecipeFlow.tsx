import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AddRecipeStep1 from '@app/components/ui/create/CreateRecipeStep1';
import AddRecipeStep2 from '@app/components/ui/create/CreateRecipeStep2';
import AddRecipeStep3 from '@app/components/ui/create/CreateRecipeStep3';
import Ingredient from '@app/types/IngredientType';
import { supabase } from '@app/lib/supabaseClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import processImage from '@app/utility/processImage';

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

function AddRecipeFlow() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RecipeFormData>(() => {
    const saved = localStorage.getItem('recipeForm');
    return saved ? JSON.parse(saved) : initialForm;
  });
  const navigate = useNavigate();

  function updateForm(fields: Partial<RecipeFormData>) {
    setForm((prev) => ({ ...prev, ...fields }));
  }

  function handleNext() {
    setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((s) => s - 1);
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
        toast.success('Image processed successfully');
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
      if (form.imageFile) {
        // Generate unique filename
        const fileExt = form.imageFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${session.user.id}/${fileName}`;

        // Upload to supabase
        const { error: uploadError } = await supabase.storage
          .from('recipe-images')
          .upload(filePath, form.imageFile);

        if (uploadError) {
          toast.dismiss(loadingToast);
          toast.error(`Failed to upload image: ${uploadError.message}`);
          return;
        }

        // Get the public URL
        const { data } = supabase.storage
          .from('recipe-images')
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
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
      toast.success('Recipe successfully created!');
      console.log('Recipe submitted:', data);

      // Clear form after successful submission
      handleReset();

      // Navigate to the recipe page or dashboard
      navigate('/search');
    } catch (error) {
      console.error('Error in submission process:', error);
      toast.dismiss();
      toast.error('An unexpected error occurred');
    }
  }

  function handleReset() {
    setForm(initialForm);
    localStorage.removeItem('recipeForm');
    setStep(1);
  }

  useEffect(() => {
    const formForStorage = {
      ...form,
      imageFile: null,
    };
    localStorage.setItem('recipeForm', JSON.stringify(formForStorage));
  }, [form]);

  return (
    <div>
      {step === 1 && (
        <AddRecipeStep1
          form={form}
          updateForm={updateForm}
          onReset={handleReset}
          onNext={handleNext}
          onFileSelect={handleFileSelect}
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
