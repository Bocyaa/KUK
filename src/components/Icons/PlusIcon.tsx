interface PlusIconProps {
  className?: string;
}

// Outline
export function PlusIcon({ className }: PlusIconProps) {
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
        d="M12 5v14m-7-7h14"
      />
    </svg>
  );
}

// Solid
export function PlusIconFilled({ className }: PlusIconProps) {
  return (
    <svg
      className={className || 'h-6 w-6 text-[#0094f6]'}
      fill="currentColor"
      stroke="none"
      viewBox="0 0 24 24"
    >
      <path d="M12 2a1 1 0 0 1 1 1v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 1 1-2 0v-8H3a1 1 0 1 1 0-2h8V3a1 1 0 0 1 1-1z" />
    </svg>
  );
}
