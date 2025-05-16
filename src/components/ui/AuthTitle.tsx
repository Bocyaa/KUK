import { ReactNode } from 'react';

interface AuthTitleProp {
  children: ReactNode;
}

function AuthTitle({ children }: AuthTitleProp) {
  return (
    <h2 className="text-2xl font-semibold text-[#181823] dark:text-white">
      {children}
    </h2>
  );
}

export default AuthTitle;
