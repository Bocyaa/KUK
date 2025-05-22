import React from 'react';

type Prop = {
  children: React.ReactNode;
  justify?: string;
  gap?: string;
  className?: string;
  height?: string;
};

function BackSecondaryCard({
  children,
  justify = 'between',
  gap = '2',
  className,
  height = '12',
}: Prop) {
  return (
    <div
      className={`flex h-${height} items-center justify-${justify} gap-${gap} rounded-xl border border-[#e6e6e6] bg-[#f9f9f9] px-1 py-1 dark:border-transparent dark:bg-[#2c2c2e] ${className && className}`}
    >
      {children}
    </div>
  );
}

export default BackSecondaryCard;
