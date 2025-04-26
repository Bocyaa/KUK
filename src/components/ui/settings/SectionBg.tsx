import React from 'react';

interface SectionBgProp {
  children: React.ReactNode;
}
//

function SectionBg({ children }: SectionBgProp) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl dark:border dark:border-[#1c1c1c]">
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-none dark:border-[#29292b]"
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

export default SectionBg;
