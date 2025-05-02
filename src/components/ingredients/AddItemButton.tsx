import { PlusIcon } from '@heroicons/react/24/outline';
// onComment={setComment} updateIngredient={addIngredient}
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
      className={`rounded-lg border px-6 py-1 transition-all duration-300 ${
        !disabled
          ? 'bg-white text-[#0094f6] dark:border-[#6f6f6f3c] dark:bg-[#161617] dark:text-[#f3f3f3]'
          : 'border-transparent bg-transparent text-gray-500 dark:text-[#6f6f6f]'
      } ${className}`}
      onClick={onClick}
    >
      <PlusIcon
        className={`w-6 transition-all duration-300 ${!disabled ? 'text-[#0094f6]' : 'text-gray-300'}`}
      />
    </button>
  );
}
