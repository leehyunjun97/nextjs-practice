'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

const SignButton = () => {
  const { data: session } = useSession();

  if (session && session?.user) {
    return (
      <button
        className='rounded-xl border bg-red-300 px-12 py-4'
        onClick={() => signOut()}
      >
        Log Out
      </button>
    );
  }
  return (
    <button
      className='rounded-xl border bg-yellow-300 px-12 py-4'
      onClick={() => signIn()}
    >
      LogIn
    </button>
  );
};

export default SignButton;
