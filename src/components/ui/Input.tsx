import React from 'react';

interface InputProps {
  id: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  top?: boolean;
  bottom?: boolean;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
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
  top,
  bottom,
  disabled,
  className = '',
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      disabled={disabled}
      className={`block w-full bg-white px-3 py-[0.375rem] text-base text-gray-900 outline-none placeholder:text-gray-400 dark:border-[#3b3f4e] dark:bg-[#181823] dark:text-white ${
        top || bottom ? '' : 'rounded-md border border-gray-300'
      } ${className} `}
    />
  );
};

export default Input;
