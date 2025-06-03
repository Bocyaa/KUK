import React from 'react';

interface FormSectionProps {
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ children, className }) => (
  <div
    className={`mx-auto flex w-full max-w-md flex-col ${className && className} rounded-2xl border border-[#e6e6e6] bg-white p-6 shadow-sm dark:border dark:border-none dark:bg-[#212121]`}
  >
    {children}
  </div>
);

export default FormSection;
