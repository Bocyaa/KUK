// import { PlusIcon } from '@heroicons/react/24/outline';

type Props = {
  disabled?: boolean;
  onClick: () => void;
  className?: string;
};

export default function AddItemButton({ disabled, onClick, className }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`rounded-lg border px-6 py-1.5 transition-all duration-300 ${
        !disabled
          ? 'bg-white dark:border-transparent dark:bg-[#1a1a1a]'
          : 'border-transparent bg-transparent'
      } ${className}`}
      onClick={onClick}
    >
      <span
        className={`w-6 transition-all duration-300 ${!disabled ? 'text-[#0094f6]' : 'text-[#5d5d5d] dark:text-[#929292]'}`}
      >
        Add
      </span>
    </button>
  );
}
