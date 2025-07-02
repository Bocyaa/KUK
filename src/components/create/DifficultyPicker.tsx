import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import InputLabel from '../../shared/components/InputLabel';

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

type Props = {
  form: {
    difficulty: string;
  };
  updateForm: (fields: Partial<Props['form']>) => void;
};

function DifficultyPicker({ form, updateForm }: Props) {
  const [selected, setSelected] = useState(difficulties.indexOf(form.difficulty));

  // refs for container + each button
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // sliding-pill style
  const [bgStyle, setBgStyle] = useState<CSSProperties>({});

  // keep component in sync with form value
  useEffect(() => {
    const idx = difficulties.indexOf(form.difficulty);
    if (idx !== selected && idx !== -1) setSelected(idx);
  }, [form.difficulty, selected]);

  // keep refs array length in sync
  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, difficulties.length);
  }, []);

  // whenever 'selected' changes, measure & move the pill just like StepHeader
  useEffect(() => {
    const el = btnRefs.current[selected];
    if (containerRef.current && el) {
      const left = el.offsetLeft;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      setBgStyle({
        // note: we omit `position` here because the <div> has `absolute` in its class
        left: `${left}px`,
        width: `${w}px`,
        height: `${h}px`,
        transition: 'left 0.3s ease, width 0.3s ease',
      });
    }
  }, [selected]);

  function handleClick(idx: number) {
    setSelected(idx);
    updateForm({ difficulty: difficulties[idx] });
  }

  return (
    <div className="mb-3 flex flex-col gap-2">
      <InputLabel>Skill Level</InputLabel>

      <div
        ref={containerRef}
        className="text-md relative flex items-center justify-between gap-1 rounded-xl border border-[#e6e6e6] bg-[#f9f9f9] px-1 py-1 dark:border-[#2c2c2e] dark:bg-[#2c2c2e]"
      >
        {/* sliding pill (copied from StepHeader) */}
        <div
          className="absolute bottom-1 top-1 rounded-lg border border-[#e6e6e6] bg-white shadow-sm dark:border-[#424242] dark:bg-[#1a1a1a]"
          style={bgStyle}
        />

        {difficulties.map((label, i) => (
          <DifficultyButton
            // capture ref
            ref={(el: HTMLButtonElement | null) => {
              btnRefs.current[i] = el;
            }}
            key={label}
            label={label}
            active={selected === i}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

const DifficultyButton = React.forwardRef<
  HTMLButtonElement,
  {
    label: string;
    active: boolean;
    onClick: () => void;
  }
>(({ label, active, onClick }, ref) => (
  <button
    ref={ref}
    type="button"
    className={`relative z-10 border border-transparent px-2 py-1.5 transition-all duration-200 ${
      active
        ? 'bg-transparent text-[#0b0b0b] dark:bg-transparent dark:text-[#ffffff]'
        : 'border-transparent bg-transparent text-gray-500 dark:text-[#afafaf]'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
));

export default DifficultyPicker;
