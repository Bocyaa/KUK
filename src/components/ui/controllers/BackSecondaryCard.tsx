import React from 'react';

type Prop = {
  children: React.ReactNode;
  justify?: string;
  gap?: string;
};

function BackSecondaryCard({ children, justify = 'between', gap = '2' }: Prop) {
  return (
    <div
      className={`flex h-12 items-center justify-${justify} gap-${gap} rounded-xl border bg-gray-100 px-1 py-1 dark:border-[#6f6f6f21] dark:bg-[#29292b]`}
    >
      {children}
    </div>
  );
}

export default BackSecondaryCard;
