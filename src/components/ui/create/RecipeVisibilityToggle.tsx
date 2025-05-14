import BackSecondaryCard from '../controllers/BackSecondaryCard';
import FormSection from '../form/FormSection';

type Props = {
  form: {
    isPrivate: boolean;
  };
  updateForm: (fields: Partial<Props['form']>) => void;
};

function RecipeVisibilityToggle({ form, updateForm }: Props) {
  return (
    <FormSection>
      <BackSecondaryCard className="flex-col">
        <div className="flex w-full items-center justify-between rounded-lg border bg-white px-2 py-2">
          <span>Recipe visibility</span>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm ${form.isPrivate ? 'text-gray-500' : 'font-medium text-blue-500'}`}
            >
              {form.isPrivate ? 'Private' : 'Public'}
            </span>
            <button
              className={`relative h-6 w-12 rounded-full transition-colors ${
                !form.isPrivate ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => updateForm({ isPrivate: !form.isPrivate })}
              aria-pressed={!form.isPrivate}
              role="switch"
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                  !form.isPrivate ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
        <span className="w-full self-start pb-1 pl-2 text-left text-xs text-gray-500">
          {form.isPrivate
            ? 'Private: Only visible to you'
            : 'Public: Can be viewed and saved by other users'}
        </span>
      </BackSecondaryCard>
    </FormSection>
  );
}

export default RecipeVisibilityToggle;
