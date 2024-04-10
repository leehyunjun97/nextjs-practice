'use client';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// 앱 전체에 SesstionProvider 감싸기
const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
