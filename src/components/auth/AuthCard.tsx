import React from 'react';

type AuthCardProps = {
  children: React.ReactNode;
};

function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="w-full max-w-sm md:max-w-sm lg:max-w-sm">
      <div className="flex flex-col justify-center rounded-2xl border border-[#d2d4db] bg-[#ffffff] dark:border-[#424242] dark:bg-[#212121]">
        {children}
      </div>
    </div>
  );
}

export default AuthCard;
