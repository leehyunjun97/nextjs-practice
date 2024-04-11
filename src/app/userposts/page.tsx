'use client';
import { IPost } from '@/types/post';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import PostCard from '../components/Card/PostCard';

const page = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const session = useSession();

  useEffect(() => {
    const getMyPosts = async () => {
      const id = session.data?.user.id;
      try {
        if (id) {
          const complate = await axios.get(`/api/user/${id}`, {
            // header에 Authorization 없어서 user가 갖고있는 토큰 넣어줌
            headers: {
              Authorization: `${session.data?.user.accessToken}`,
            },
          });

          setPosts(complate.data);
          console.log(complate.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyPosts();
  }, [session]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='grid-cols-1 sm:grid md:grid-cols-3'>
        {posts && posts.map((it) => <PostCard key={it.id} post={it} />)}
      </div>
    </main>
  );
};

export default page;
