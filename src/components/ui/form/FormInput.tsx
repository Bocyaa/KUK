import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  addClass?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, addClass, disabled, ...props }) => (
  <div className="parent flex flex-col gap-1">
    <label
      className={`mb-1 text-xs font-normal uppercase tracking-wide transition-colors ${disabled ? 'text-gray-300 dark:text-[#6f6f6f76]' : 'label-focus-within:text-custom text-gray-500 dark:text-[#7c7c7c]'} `}
    >
      {label}
    </label>
    <input
      disabled={disabled}
      className={`rounded-none border-b bg-transparent px-0 py-2 transition-all focus:border-[#0094f6] focus:outline-none dark:text-[#f9f9f9] dark:placeholder-[#6f6f6f64] ${addClass && addClass} ${
        disabled
          ? 'dark:border-[#4c4c4c]'
          : 'border-[#c4c6ca] placeholder-gray-300 dark:border-[#4c4c4c]'
      } `}
      {...props}
    />
  </div>
);

export default FormInput;
