import { useEffect, useState } from 'react';

import DifficultyPicker from '@app/components/create/DifficultyPicker';
import ImagePicker from '@app/components/create/ImagePicker';
import FormSection from '@app/shared/components/form/FormSection';
import Input from '../../shared/components/Input';
import HelperText from './HelperText';

type Props = {
  form: {
    image?: string;
    title: string;
    description?: string;
    difficulty: string;
  };
  updateForm: (fields: Partial<Props['form']>) => void;

  onFileSelect?: (file: File | null) => void;
};

function CreateRecipeStep1({ form, updateForm, onFileSelect }: Props) {
  const titlePlaceholders = [
    'Give your recipe a catchy title...',
    'What’s the name of your masterpiece?',
    'A title that makes it unforgettable...',
    'Name your creation!',
    'Make it stand out with a great title!',
  ];

  const descriptionPlaceholders = [
    'Describe your recipe in a few words...',
    'What makes this recipe special?',
    'A short and tempting description...',
    'Highlight the magic of your dish!',
    'Why will people love this recipe?',
  ];

  const [titlePlaceholder, setTitlePlaceholder] = useState('');
  const [descriptionPlaceholder, setDescriptionPlaceholder] = useState('');

  useEffect(() => {
    // Randomly select a placeholder for title and description on mount
    setTitlePlaceholder(
      titlePlaceholders[Math.floor(Math.random() * titlePlaceholders.length)],
    );
    setDescriptionPlaceholder(
      descriptionPlaceholders[
        Math.floor(Math.random() * descriptionPlaceholders.length)
      ],
    );
  }, []);

  return (
    <div className="mb-12 mt-16 flex w-full flex-col gap-4">
      <ImagePicker
        form={form}
        updateForm={updateForm}
        src={form.image}
        onFileSelect={onFileSelect}
      />

      <FormSection className="gap-5">
        <Input
          label="Recipe Title"
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={(e) => updateForm({ title: e.target.value })}
          placeholder={titlePlaceholder}
        />

        <Input
          label="Short Description"
          id="description"
          name="description"
          type="text"
          placeholder={descriptionPlaceholder}
          value={form.description}
          onChange={(e) => updateForm({ description: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <DifficultyPicker form={form} updateForm={updateForm} />
        <HelperText
          text="Set the skill level to show how challenging the recipe is and
          filter recipes accordingly."
          marginBottom="mb-0"
        />
      </FormSection>
    </div>
  );
}

export default CreateRecipeStep1;
