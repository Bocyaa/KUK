import { useEffect, useRef, useState, CSSProperties } from 'react';
import {
  ArrowLongRightIcon,
  CheckCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import IngredientType from '@app/types/IngredientTypes';

const STEPS_CONFIG = [
  { id: 1, label: 'Step 1' },
  { id: 2, label: 'Step 2' },
  { id: 3, label: 'Step 3' },
];

interface StepHeaderProps {
  form: {
    title: string;
    ingredients: IngredientType[];
    categories: string[];
  };
  step: number;
  maxReachedStep: number;
  onReset: () => void;
  onStepClick: (id: number) => void;
  onNextClick: () => void;
  disableNext: boolean;
}

export default function StepHeader({
  form,
  step,
  maxReachedStep,
  onReset,
  onStepClick,
  onNextClick,
  disableNext,
}: StepHeaderProps) {
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [bgStyle, setBgStyle] = useState<CSSProperties>({});

  // keep array sized to steps
  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, STEPS_CONFIG.length);
  }, []);

  // recalc pill on step change
  useEffect(() => {
    const el = stepRefs.current[step - 1];
    if (containerRef.current && el) {
      const left = el.offsetLeft;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      setBgStyle({
        left: `${left}px`,
        width: `${w}px`,
        height: `${h + 2}px`,
        transition: 'left 0.3s ease, width 0.3s ease',
      });
    }
  }, [step]);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex bg-transparent">
      <div
        ref={containerRef}
        className="relative mx-auto flex max-w-md translate-y-2 items-center justify-center gap-2 rounded-2xl border border-[#e6e6e6] bg-[#f9f9f9]/70 px-1 py-1 shadow-sm backdrop-blur-sm dark:border-[#424242] dark:bg-[#212121]/70 standalone:translate-y-1"
      >
        <button
          onClick={() => form.title && onReset()}
          className={`relative z-10 flex cursor-pointer items-center justify-center rounded-xl border px-2 py-2 shadow-sm ${disableNext ? 'border-transparent bg-transparent opacity-50' : 'border-[#e6e6e6] bg-white active:bg-[#c1c1c1] dark:border-[#424242] dark:bg-[#2c2c2c] dark:active:bg-[#1a1a1a]'}`}
        >
          <TrashIcon
            className={`h-6 w-6 text-red-500 ${form.title === '' ? 'opacity-50' : ''}`}
          />
        </button>

        {STEPS_CONFIG.map((cfg, i) => (
          <button
            key={cfg.id}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            onClick={() => cfg.id <= maxReachedStep && onStepClick(cfg.id)}
            className={`relative z-10 flex items-center justify-center rounded-lg px-2 py-2 transition ${
              cfg.id > maxReachedStep
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            } ${i === 0 && form.title !== '' && 'text-green-600 dark:text-green-500'} ${i === 1 && form.ingredients.length !== 0 && 'text-green-600 dark:text-green-500'} ${i === 2 && form.categories.length !== 0 && 'text-green-600 dark:text-green-500'}`}
          >
            <span className="font-semibold">{cfg.label}</span>
          </button>
        ))}

        <div
          className="absolute bottom-1 top-1 rounded-xl border border-[#e6e6e6] bg-white shadow-sm dark:border-[#424242] dark:bg-[#2c2c2e]"
          style={bgStyle}
        />

        <button
          onClick={() => !disableNext && onNextClick()}
          className={`relative z-10 flex cursor-pointer items-center justify-center rounded-xl border px-2 py-2 shadow-sm ${disableNext ? 'border-transparent bg-transparent opacity-50' : 'border-[#e6e6e6] bg-white active:bg-[#c1c1c1] dark:border-[#424242] dark:bg-[#2c2c2c] dark:active:bg-[#1a1a1a]'}`}
        >
          {step === STEPS_CONFIG.length ? (
            <CheckCircleIcon className="h-6 w-6 stroke-green-600 dark:text-green-500" />
          ) : (
            <ArrowLongRightIcon
              className={`h-6 w-6 ${disableNext ? 'opacity-50' : 'text-[#0094f6]'}`}
            />
          )}
        </button>
      </div>
    </div>
  );
}
