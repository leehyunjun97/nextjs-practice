// 13버젼의 규칙상 api파일은 route.ts 이어야 된다.

import prisma from '@/app/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

// post 방식(body 부분)으로 데이터 받기
export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  // prisma DB의 user 테이블에 데이터 넣기

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      // password 암호화
      password: await bcrypt.hash(body.password, 10),
    },
  });

  //데이터 넣기 성공 시 user 객체에 반환
  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
}
