interface ChevronLeftProps {
  className?: string;
  strokeWidth?: number;
}

function ChevronLeft({ className, strokeWidth = 2 }: ChevronLeftProps) {
  return (
    <svg
      className={`h-5 w-5 ${className && className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

export default ChevronLeft;
