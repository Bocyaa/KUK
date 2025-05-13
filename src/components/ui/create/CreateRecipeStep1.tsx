import { useEffect } from 'react';

import DifficultyPicker from '@app/components/ui/create/DifficultyPicker';
import ImagePicker from '@app/components/ui/create/ImagePicker';
import FormInput from '@app/components/ui/form/FormInput';
import FormSection from '@app/components/ui/form/FormSection';
import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';

type Props = {
  form: {
    image?: string;
    title: string;
    description?: string;
    difficulty: string;
  };
  updateForm: (fields: Partial<Props['form']>) => void;
  onReset: () => void;
  onNext: () => void;
};

function CreateRecipeStep1({ form, updateForm, onNext, onReset }: Props) {
  const {
    setIsDirty,
    setLabelLeft,
    setLabelRight,
    setOnLeftClick,
    setOnRightClick,
  } = useFormConfirm();

  useEffect(() => {
    setLabelLeft('Reset');
    setLabelRight('Step 2');
    setOnLeftClick(() => onReset);
    setOnRightClick(() => onNext);
  }, []);

  useEffect(() => {
    if (form.title) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [form]);

  return (
    <div className="mt-16 flex w-full flex-col gap-5">
      <ImagePicker form={form} updateForm={updateForm} src={form.image} />
      <FormSection className="gap-10">
        <FormInput
          autoFocus={form.title ? false : true}
          label="Recipe Title"
          name="title"
          type="text"
          value={form.title}
          placeholder="Classic Lasagna ..."
          onChange={(e) => updateForm({ title: e.target.value })}
        />
        <FormInput
          label="Short Description"
          name="description"
          type="text"
          placeholder="A cheesy Italian favorite ..."
          value={form.description}
          onChange={(e) => updateForm({ description: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <DifficultyPicker form={form} updateForm={updateForm} />
      </FormSection>
    </div>
  );
}

export default CreateRecipeStep1;
