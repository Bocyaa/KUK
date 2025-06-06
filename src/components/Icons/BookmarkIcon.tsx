interface BookmarkIconProps {
  className?: string;
}

// Outline
export function BookmarkIcon({ className }: BookmarkIconProps) {
  return (
    <svg
      className={className || 'h-5 w-5 text-white'}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
      />
    </svg>
  );
}

// Solid
export function BookmarkIconFilled({ className }: BookmarkIconProps) {
  return (
    <svg
      className={className || 'h-5 w-5 text-white'}
      fill="currentColor"
      stroke="none"
      viewBox="0 0 24 24"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}
