import React from 'react';

type Prop = {
  children: React.ReactNode;
};

function LabelPlaceholder({ children }: Prop) {
  return (
    <span className="w-full text-center text-xs uppercase text-gray-400">
      {children}
    </span>
  );
}

export default LabelPlaceholder;
