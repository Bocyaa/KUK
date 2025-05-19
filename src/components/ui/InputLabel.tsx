import { ReactNode } from 'react';

interface InputLabelProp {
  children: ReactNode;
}

function InputLabel({ children }: InputLabelProp) {
  return (
    <label className="mb-1 text-xs font-medium tracking-wider dark:text-[#e3e3e3]">
      {children}
    </label>
  );
}

export default InputLabel;
