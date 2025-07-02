import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number; // px
  accent?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, size = 96 }) => (
  <div
    className={`flex items-center justify-center rounded-full border border-[#e6e6e6] bg-[#f9f9f9] transition-all dark:border-transparent dark:bg-[#212121] md:hover:ring-2 md:hover:ring-blue-400`}
    style={{ width: size, height: size }}
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
        width={size * 0.5}
        height={size * 0.5}
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
