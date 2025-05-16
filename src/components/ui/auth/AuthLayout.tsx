import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className="flex h-full flex-col items-center justify-center bg-[#f9fafb] px-[1.625rem] py-12 dark:bg-[#181823]">
        {children}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center border-t bg-white pb-6 pt-4 text-sm text-[#17182399] dark:border-[#3b3f4e] dark:bg-[#181823]">
          <a href="#" className="hover:underline dark:text-[#929299]">
            Made with ♥ by BobHab
          </a>
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
