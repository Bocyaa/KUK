import React from 'react';
import SpinnerBar from './SpinnerBar';

interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  disabled = false,
  isLoading = false,
  onClick,
  type = 'submit',
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-center justify-center rounded-xl px-3 py-2 text-sm/6 font-semibold transition-colors duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
        disabled || isLoading
          ? 'cursor-not-allowed bg-gray-200 text-gray-400 dark:border dark:border-[#424242] dark:bg-[#212121]'
          : 'bg-[#3f6ef3] text-white active:bg-[#c1c1c1] dark:border dark:border-[#2c2c2e] dark:bg-[#e3e3e3] dark:text-[#000000] md:hover:bg-[#c1c1c1]'
      } `}
    >
      {!isLoading ? (
        <span className="font-bold">{label}</span>
      ) : (
        <span className="flex h-6 items-center justify-center">
          <SpinnerBar width={60} height={2} />
        </span>
      )}
    </button>
  );
};

export default SubmitButton;
