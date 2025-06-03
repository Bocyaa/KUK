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
      <div className="flex w-full items-center justify-between rounded-lg border border-[#e6e6e6] bg-white px-2 py-2 dark:border-transparent dark:bg-[#1a1a1a]">
        <span className="pl-1 text-[#0d0d0d] dark:text-[#e3e3e3]">
          Recipe Visibility
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm ${form.isPrivate ? 'text-[#5d5d5d] dark:text-[#afafaf]' : 'text-[#0094f6]'}`}
          >
            {form.isPrivate ? 'Private' : 'Public'}
          </span>
          <button
            className={`relative w-12 rounded-full py-3 transition-colors ${
              !form.isPrivate
                ? 'border border-transparent bg-[#0094f6] dark:border-transparent'
                : 'border border-[#e6e6e6] bg-[#f9f9f9] dark:border-transparent dark:bg-[#2c2c2e]'
            }`}
            onClick={() => updateForm({ isPrivate: !form.isPrivate })}
            aria-pressed={!form.isPrivate}
            role="switch"
          >
            <span
              className={`absolute bottom-0.5 h-5 w-5 rounded-full border border-[#e6e6e6] bg-white shadow-sm transition-transform dark:border-transparent dark:bg-[#e3e3e3] ${
                !form.isPrivate ? 'left-6' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>
      <span className="mt-2 w-full self-start px-1 pl-2 text-left text-xs font-medium text-[#7d7d7d] dark:text-[#7e7e7e]">
        {form.isPrivate
          ? 'Private: Only visible to you'
          : 'Public: Can be viewed and saved by other users'}
      </span>
    </FormSection>
  );
}

export default RecipeVisibilityToggle;
