import { ReactNode } from 'react';

interface InputLabelProp {
  children: ReactNode;
}

function InputLabel({ children }: InputLabelProp) {
  return (
    <label
      htmlFor='email'
      className='block text-sm/6 font-medium text-gray-900'
    >
      {children}
    </label>
  );
}

export default InputLabel;
