import prisma from '@/app/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  email: string;
  password: string;
}

// 로그인도 POST 방식 사용
export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  // body에서 받은 데이터를 prisma DB 데이터와 비교해 첫 번째를 찾는다
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  // 사용자의 password를 알아볼 필요 없이 compare함수로 비교
  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    return new Response(JSON.stringify(userWithoutPass));
  } else return new Response(JSON.stringify(null));
}
