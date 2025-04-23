import { ReactNode } from "react";

interface InputLabelProp {
  children: ReactNode;
}

function InputLabel({ children }: InputLabelProp) {
  return (
    <label className="mb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-[#a0a0a0]">
      {children}
    </label>
  );
}

export default InputLabel;
