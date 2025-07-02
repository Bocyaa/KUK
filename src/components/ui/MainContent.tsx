interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

function MainContent({ children, className = '' }: ContentContainerProps) {
  return <div className={`px-5 pb-24 pt-20 ${className}`}>{children}</div>;
}

export default MainContent;
