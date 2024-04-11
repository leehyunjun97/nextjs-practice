'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

const SignButton = () => {
  const { data: session } = useSession();

  if (session && session?.user) {
    return (
      <button
        className='rounded-xl font-bold text-base'
        onClick={() => signOut()}
      >
        로그아웃
      </button>
    );
  }
  return (
    <button className='rounded-xl font-bold text-base' onClick={() => signIn()}>
      로그인
    </button>
  );
};

export default SignButton;
