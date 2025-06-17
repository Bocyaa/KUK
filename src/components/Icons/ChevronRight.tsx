interface ChevronRightProps {
  className?: string;
}

// Outline
export function ChevronRight({ className }: ChevronRightProps) {
  return (
    <svg
      className={className || 'h-6 w-6 text-[#0094f6]'}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m9 18 6-6-6-6"
      />
    </svg>
  );
}

// Solid
export function ChevronRightFilled({ className }: ChevronRightProps) {
  return (
    <svg
      className={className || 'h-6 w-6 text-[#0094f6]'}
      fill="currentColor"
      stroke="none"
      viewBox="0 0 24 24"
    >
      <path d="M8.25 4.5a.75.75 0 0 0-.22 1.5L14.939 12l-6.91 6a.75.75 0 1 0 1.061 1.061l7.5-7.5a.75.75 0 0 0 0-1.061l-7.5-7.5a.75.75 0 0 0-.839-.22z" />
    </svg>
  );
}
