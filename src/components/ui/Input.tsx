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
      className={`block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${
        top || bottom ? '' : 'rounded-md border border-gray-300'
      }`}
    />
  );
};

export default Input;
