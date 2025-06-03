import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number; // px
  accent?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User avatar",
  size = 96,
  accent = "bg-white dark:bg-[#1c1c1e]",
}) => (
  <div
    className={`flex items-center justify-center overflow-hidden rounded-full ${accent} shadow-sm transition-all hover:ring-2 hover:ring-blue-400 dark:border dark:border-[#1c1c1c]`}
    style={{ width: size, height: size }}
  >
    {src ? (
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        draggable={false}
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
