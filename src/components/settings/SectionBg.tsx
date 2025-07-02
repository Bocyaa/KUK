import React from 'react';

interface SectionBgProp {
  children: React.ReactNode;
}
//

function SectionBg({ children }: SectionBgProp) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#e6e6e6] dark:border-transparent">
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
