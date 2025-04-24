import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  addClass?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, addClass, disabled, ...props }) => (
  <div className="flex flex-col gap-1">
    <label
      className={`mb-1 text-xs uppercase tracking-wide ${disabled ? 'text-gray-300' : 'text-gray-500 dark:text-[#a0a0a0]'}`}
    >
      {label}
    </label>
    <input
      className={`rounded-none border-b bg-transparent px-0 py-2 text-base text-gray-900 transition-all focus:border-gray-100 focus:outline-none dark:border-[#a0a0a0] dark:text-[#f9f9f9] dark:placeholder-gray-500 ${addClass && addClass} ${disabled ? 'border-gray-200 placeholder-gray-200' : 'border-gray-300 placeholder-gray-300'}`}
      disabled={disabled}
      {...props}
    />
  </div>
);

export default FormInput;
