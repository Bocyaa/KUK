import React from 'react';

interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  disabled = false,
  type = 'submit',
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
        ${
          disabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-800 text-white hover:bg-gray-500'
        }
      `}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
