interface MagnifyingGlassIconProps {
  className?: string;
}

// Outline
export function MagnifyingGlassIcon({ className }: MagnifyingGlassIconProps) {
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
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
      />
    </svg>
  );
}

// Solid
export function MagnifyingGlassIconFilled({
  className,
}: MagnifyingGlassIconProps) {
  return (
    <svg
      className={className || 'h-6 w-6 text-[#0094f6]'}
      fill="currentColor"
      stroke="none"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5zM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
