import NextAuth from 'next-auth';

// token 추가 커스터마이징
declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      accessToken: string;
    };
  }
}
