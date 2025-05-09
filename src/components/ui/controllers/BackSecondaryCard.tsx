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
      className={`flex h-${height} items-center justify-${justify} gap-${gap} rounded-xl border bg-gray-100 px-1 py-1 dark:border-[#6f6f6f21] dark:bg-[#29292b] ${className && className}`}
    >
      {children}
    </div>
  );
}

export default BackSecondaryCard;
