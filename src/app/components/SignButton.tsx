'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
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
    <div>
      <button
        className='rounded-xl font-bold text-base mr-4'
        onClick={() => signIn()}
      >
        로그인
      </button>
      {/* <button
        className='rounded-xl font-bold text-base '
        onClick={() => signIn()}
      >
        회원가입
      </button> */}
      <Link href={'/signup'}>
        <span className='font-bold'>회원가입</span>
      </Link>
    </div>
  );
};

export default SignButton;
