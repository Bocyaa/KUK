import { ReactNode } from 'react';

interface AuthTitleProp {
  children: ReactNode;
}

function AuthTitle({ children }: AuthTitleProp) {
  return (
    <h2 className='mt-6 text-center text-2xl font-bold tracking-tight text-gray-900'>
      {children}
    </h2>
  );
}

export default AuthTitle;
