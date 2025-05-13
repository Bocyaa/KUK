import { useEffect, useState } from 'react';

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

type Props = {
  form: {
    difficulty: string;
  };
  updateForm: (fields: Partial<Props['form']>) => void;
};

function DifficultyPicker({ form, updateForm }: Props) {
  const [selected, setSelected] = useState(
    difficulties.indexOf(form.difficulty),
  );

  // Keep component in sync with form value
  useEffect(() => {
    const formDifficultyIndex = difficulties.indexOf(form.difficulty);
    if (formDifficultyIndex !== selected && formDifficultyIndex !== -1) {
      setSelected(formDifficultyIndex);
    }
  }, [form.difficulty, selected]);

  function handleClick(selected: number) {
    setSelected(selected);
    updateForm({ difficulty: difficulties[selected] });
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-[#6f6f6f]">
        Difficulty level
      </span>

      <div className="text-md flex items-center justify-between rounded-xl border bg-gray-100 px-1 py-1 dark:border-[#6f6f6f21] dark:bg-[#29292b]">
        <DifficultyButton
          label="Beginner"
          active={selected === 0}
          onClick={() => handleClick(0)}
        />

        <span className="font-thin text-gray-300 dark:text-[#6f6f6f64]">|</span>

        <DifficultyButton
          label="Intermediate"
          active={selected === 1}
          onClick={() => handleClick(1)}
        />

        <span className="font-thin text-gray-300 dark:text-[#6f6f6f64]">|</span>

        <DifficultyButton
          label="Advanced"
          active={selected === 2}
          onClick={() => handleClick(2)}
        />
      </div>
    </div>
  );
}

function DifficultyButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`rounded-lg border px-2 py-1 transition-all duration-200 ${
        active
          ? 'border-gray-300 bg-white text-[#0b0b0b] dark:border-[#6f6f6f3c] dark:bg-[#161617] dark:text-[#f3f3f3]'
          : 'border-transparent bg-transparent text-gray-500 dark:text-[#6f6f6f]'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default DifficultyPicker;
