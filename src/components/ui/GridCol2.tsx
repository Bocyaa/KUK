import { ReactNode } from 'react';

interface GridCol2Props {
  children: ReactNode;
}

function GridCol2({ children }: GridCol2Props) {
  return (
    <div className="grid grid-cols-2 place-items-center gap-x-4 gap-y-4">
      {children}
    </div>
  );
}

export default GridCol2;
