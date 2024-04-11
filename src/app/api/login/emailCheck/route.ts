import prisma from '@/app/lib/prisma';

interface RequestBody {
  email: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const check = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  return new Response(JSON.stringify(check));
}
