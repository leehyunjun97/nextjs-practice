// 미들웨어를 이용한 페이지 보호

// next에서 제공하는 것으로 이것만 적어도 미들웨어 작동
export { default } from 'next-auth/middleware';

// userposts 경로 밑으로 보호
export const config = {
  matcher: ['/userposts/:path*'],
};
