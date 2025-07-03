import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number; // rem
  accent?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, size = 6 }) => (
  <div
    className={`flex items-center justify-center rounded-full transition-all md:hover:ring-2 md:hover:ring-blue-400`}
    style={{ width: `${size}rem`, height: `${size}rem` }}
  >
    {src ? (
      <img
        src={src}
        draggable={false}
        alt="User avatar"
        className="h-full w-full rounded-full object-cover"
      />
    ) : (
      <svg
        width={`${size * 0.8}rem`}
        height={`${size * 0.8}rem`}
        viewBox="0 0 24 24"
        fill="none"
        className="text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="8" r="4" fill="currentColor" />
        <path
          d="M4 20c0-4 4-6 8-6s8 2 8 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )}
  </div>
);

export default Avatar;
