import React from 'react';

type Prop = {
  children: React.ReactNode;
  width?: string;
  className?: string;
};
// px-3 py-1
function FrontPrimaryCard({ children, className, width = '7.3rem' }: Prop) {
  return (
    <div
      className={`flex w-[${width}] h-9 items-center justify-between overflow-hidden rounded-lg border bg-white ${className && className}`}
    >
      {children}
    </div>
  );
}

export default FrontPrimaryCard;
