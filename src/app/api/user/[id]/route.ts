// [id]라는 스퀘어 브라켓( 동적 라우트 )
// pages/posts/[id] 게시물 번호 받아서 바꾸는 느낌

import { verityJwt } from '@/app/lib/jwt';
import prisma from '@/app/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // request header에서 token을 가져오고
  // 없으면 401에러
  const accessToken = request.headers.get('authorization');
  if (!accessToken || !verityJwt(accessToken)) {
    return new Response(JSON.stringify({ error: 'No Authorization' }), {
      status: 401,
    });
  }

  console.log(params);
  const id = Number(params.id);

  const userPosts = await prisma.post.findMany({
    where: {
      authorId: id,
    },
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(userPosts));
}
