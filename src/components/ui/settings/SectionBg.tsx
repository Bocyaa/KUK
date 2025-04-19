import React from "react";

interface SectionBgProp {
  children: React.ReactNode;
}

function SectionBg({ children }: SectionBgProp) {
  return (
    <div className="flex flex-col rounded-2xl bg-white dark:border dark:border-[#1c1c1c] dark:bg-[#1c1c1e]">
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
