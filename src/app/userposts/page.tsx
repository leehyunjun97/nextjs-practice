'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';

const page = () => {
  const session = useSession();

  const handler = async () => {
    const id = session.data?.user.id;

    try {
      const complate = await axios.get(`http://localhost:3000/api/user/${id}`, {
        // header에 Authorization 없어서 user가 갖고있는 토큰 넣어줌
        headers: {
          Authorization: `${session.data?.user.accessToken}`,
        },
      });
      console.log(complate.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      UserPosts
      <button onClick={handler}>포스트받기</button>
    </main>
  );
};

export default page;
