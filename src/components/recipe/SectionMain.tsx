import { ReactNode } from 'react';

interface SectionMainProps {
  children: ReactNode;
}

function SectionMain({ children }: SectionMainProps) {
  return (
    <div
      className="flex w-full flex-col gap-3 pb-10 pt-14" // rounded-b-[2rem]
      style={{ background: 'var(--theme-bg-gradient)' }}
    >
      {children}
    </div>
  );
}

export default SectionMain;
