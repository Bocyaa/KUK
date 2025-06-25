import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black">{children}</div>
  );
}

export default PageContainer;
