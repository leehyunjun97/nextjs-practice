// [id]라는 스퀘어 브라켓( 동적 라우트 )
// pages/posts/[id] 게시물 번호 받아서 바꾸는 느낌

import { verifyJwt } from '@/app/lib/jwt';
import prisma from '@/app/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const accessToken = request.headers.get('authorization');

  console.log('엑세스토큰: ', accessToken);

  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: 'No Authorization' }), {
      status: 401,
    });
  }

  // 기본적으로 params.id는 string 타입이라서 꼭 Number 타입으로 변환해줘야 한다
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
