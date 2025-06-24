import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#f9fafb] pt-6 dark:bg-gradient-to-t dark:from-[#000000] dark:to-[#0f0f0f]">
      <main className="flex flex-1 flex-col items-center justify-center px-[1.625rem] pb-6">
        {children}
      </main>

      <footer className="flex w-full items-center justify-center border-t bg-white pb-4 pt-4 text-sm text-[#17182399] dark:border-[#424242] dark:bg-[#212121] standalone:pb-6">
        <a href="#" className="hover:underline dark:text-[#929299]">
          Made with ♥ by BobHab
        </a>
      </footer>
    </div>
  );
}

export default AuthLayout;
