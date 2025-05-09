import { useState } from 'react';
import BackSecondaryCard from '../controllers/BackSecondaryCard';
import FormInput from '../form/FormInput';
import FormSection from '../form/FormSection';
import FrontPrimaryCard from '../controllers/FrontPrimaryCard';
import LabelPlaceholder from './LabelPlaceholder';

type CategoryPickerProps = {
  form: {
    categories: string[];
  };
  updateForm: (fields: Partial<CategoryPickerProps['form']>) => void;
};

function CategoryPicker({ form, updateForm }: CategoryPickerProps) {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(form.categories);

  function resetInput() {
    setCategory('');
  }

  function addCategory() {
    const trimmedName = category.trim();
    if (!trimmedName) return;

    const newCategories = [...categories, category];

    setCategories(newCategories);
    updateForm({ categories: newCategories });

    resetInput();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCategory();
    }
  }

  function pop(c: string) {
    setCategory(c);

    const inputElement = document.querySelector('input');
    inputElement?.focus();

    const updatedCategories = categories.filter((category) => category !== c);
    setCategories(updatedCategories);

    updateForm({ categories: updatedCategories });
  }

  return (
    <FormSection>
      <FormInput
        label="Categories"
        placeholder="Category name"
        addClass="mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addCategory}
      />
      <BackSecondaryCard justify="start">
        {categories.length > 0 ? (
          <div className="no-scrollbar flex space-x-1 overflow-x-scroll">
            {categories.map((c) => (
              <FrontPrimaryCard key={c} className="flex-shrink-0">
                <button className="px-2 py-1 capitalize" onClick={() => pop(c)}>
                  {c}
                </button>
              </FrontPrimaryCard>
            ))}
          </div>
        ) : (
          <LabelPlaceholder>empty</LabelPlaceholder>
        )}
      </BackSecondaryCard>
    </FormSection>
  );
}

export default CategoryPicker;
