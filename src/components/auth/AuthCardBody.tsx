import React from 'react';

type AuthCardBodyProps = {
  children: React.ReactNode;
};

function AuthCardBody({ children }: AuthCardBodyProps) {
  return <div className="px-6 py-5">{children}</div>;
}

export default AuthCardBody;
