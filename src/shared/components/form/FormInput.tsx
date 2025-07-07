import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  addClass?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  addClass,
  disabled,
  ...props
}) => (
  <div className="parent flex flex-col gap-1">
    <label
      className={`font-regular mb-1 text-xs uppercase tracking-wider transition-colors ${disabled ? 'dark:text-[#afafaf]' : 'label-focus-within:text-custom'} `}
    >
      {label}
    </label>
    <input
      disabled={disabled}
      className={`w-full rounded-lg border border-[#e6e6e6] bg-white px-3 py-2 transition-all focus:border-[#0094f6] focus:outline-none dark:text-[#ffffff] dark:placeholder-[#b4b4b4] ${addClass && addClass}`}
      {...props}
    />
  </div>
);

// className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none placeholder:text-gray-400 dark:border-[#424242] dark:bg-transparent dark:text-white dark:placeholder:text-[#b4b4b4] ${eye ? 'pr-10' : ''} ${className}`}

export default FormInput;
