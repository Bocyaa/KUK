import React from "react";

interface FormSectionProps {
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ children }) => (
  <div className="mx-auto flex w-full max-w-md flex-col gap-10 rounded-2xl bg-white p-6 shadow-sm dark:border dark:border-[#1c1c1c] dark:bg-[#1c1c1e]">
    {children}
  </div>
);

export default FormSection;
