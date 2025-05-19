import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react';

interface InputProps {
  id: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  eye?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  name = id,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = true,
  autoComplete = 'off',
  disabled,
  className = '',
  eye = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  // Determine the actual input type
  const inputType =
    eye && type === 'password' ? (isVisible ? 'text' : 'password') : type;

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        disabled={disabled}
        // onKeyDown={onKeyDown}
        className={`w-full border border-gray-300 bg-white px-3 py-[0.375rem] text-gray-900 outline-none placeholder:text-gray-400 dark:border-[#424242] dark:bg-transparent dark:text-white dark:placeholder:text-[#b4b4b4] ${eye ? 'pr-10' : ''} ${className}`}
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
  );
};

export default Input;
