import { ReactNode } from 'react';

interface InputLabelProp {
  children: ReactNode;
}

function InputLabel({ children }: InputLabelProp) {
  return (
    <label className="mb-1 text-xs font-medium tracking-wider dark:text-[#bdbec1]">
      {children}
    </label>
  );
}

export default InputLabel;
