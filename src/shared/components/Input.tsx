import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  eye?: boolean;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  id = '',
  eye = false,
  label = '',
  type = 'text',
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  // Determine the actual input type
  const inputType =
    eye && type === 'password' ? (isVisible ? 'text' : 'password') : type;

  return (
    <div className="parent flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className={`font-regular label-focus-within:text-custom mb-1 text-xs uppercase tracking-wider transition-colors dark:text-[#e3e3e3]`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          {...rest}
          className={`w-full rounded-xl border border-[#e6e6e6] bg-white px-3 py-2 outline-none placeholder:text-gray-400 focus:border-[#000000] focus:outline-none dark:border-[#424242] dark:bg-transparent dark:text-[#e3e3e3] dark:placeholder:text-[#5d5d5d] dark:focus:border-[#ffffff] ${eye ? 'pr-10' : ''}`}
        />

        {eye && type === 'password' && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            aria-label={isVisible ? 'Hide password' : 'Show password'}
          >
            {isVisible ? <Eye size={18} /> : <EyeClosed size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
