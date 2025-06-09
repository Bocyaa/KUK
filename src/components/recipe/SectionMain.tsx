import { ReactNode } from 'react';

interface SectionMainProps {
  children: ReactNode;
}

function SectionMain({ children }: SectionMainProps) {
  return (
    <div
      className="flex w-full flex-col gap-3 pb-8 pt-16"
      style={{ background: 'var(--theme-bg-gradient)' }}
    >
      {children}
    </div>
  );
}

export default SectionMain;
