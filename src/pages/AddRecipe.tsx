import ImagePicker from '@app/components/ui/create/ImagePicker';
import FormInput from '@app/components/ui/form/FormInput';
import FormSection from '@app/components/ui/form/FormSection';
import { useState } from 'react';

type FormState = {
  title: string;
  description: string;
};

function AddRecipe() {
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="mt-16 flex w-full flex-col gap-5">
      <ImagePicker />
      <FormSection>
        <FormInput
          label="Recipe Title"
          name="title"
          type="text"
          value={form.title}
          placeholder="Classic Lasagna ..."
          onChange={handleChange}
        />
        <FormInput
          label="Short Description"
          name="description"
          type="text"
          placeholder="A cheesy Italian favorite ..."
          value={form.description}
          onChange={handleChange}
        />
        {/* TODO: Ingredients */}
        {/* TODO: Time Picker */}
        {/* TODO: Difficulty Picker */}
        {/* TODO: Price Picker */}
        {/* TODO: Calory Picker */}
        {/* TODO: Portion Picker */}
        {/* TODO: Is Private Checkbox */}
        {/* TODO: Categories picker */}
      </FormSection>
    </div>
  );
}

export default AddRecipe;
