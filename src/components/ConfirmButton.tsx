import React from 'react';

interface ConfirmButtonProps {
  label: string;
  isDirty: boolean;
  onConfirm: () => void;
  isLoading?: boolean;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  label,
  isDirty,
  onConfirm,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <span className="bottom-0 right-0 top-0 flex items-center justify-end pr-2 text-xs font-semibold text-gray-300">
        {/* Replace with your SpinnerBar if needed */}
        <span>Loading...</span>
      </span>
    );
  }

  return (
    <button
      disabled={!isDirty}
      onClick={onConfirm}
      className={`font-semibold transition-all ${
        isDirty ? 'text-[#0094f6]' : 'text-[#d1d5db] dark:text-[#6f6f6f64]'
      } active:text-[#0094f683]`}
    >
      {label}
    </button>
  );
};

export default ConfirmButton;
