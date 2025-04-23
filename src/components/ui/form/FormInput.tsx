import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="mb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-[#a0a0a0]">
      {label}
    </label>
    <input
      className="rounded-none border-b border-gray-300 bg-transparent px-0 py-2 text-base text-gray-900 placeholder-gray-300 transition-all focus:border-gray-100 focus:outline-none dark:border-[#a0a0a0] dark:text-[#f9f9f9] dark:placeholder-gray-500"
      {...props}
    />
  </div>
);

export default FormInput;
