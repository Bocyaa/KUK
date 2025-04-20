import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="mb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-[#f9f9f9]">
      {label}
    </label>
    <input
      className="border-b border-gray-300 bg-transparent px-0 py-2 text-base text-gray-900 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none dark:text-[#f9f9f9]"
      {...props}
    />
  </div>
);

export default FormInput;
