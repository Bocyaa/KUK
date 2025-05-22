import { ReactNode } from 'react';

interface InputLabelProp {
  children: ReactNode;
  className?: string;
}

function InputLabel({ children, className }: InputLabelProp) {
  return (
    <label
      className={`font-regular label-focus-within:text-custom mb-1 text-xs uppercase tracking-wider transition-colors dark:text-[#e3e3e3] ${className && className}`}
    >
      {children}
    </label>
  );
}

export default InputLabel;
