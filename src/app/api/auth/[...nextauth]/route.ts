import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

// [...]: next만의 동적 라우팅 문법

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: '이메일',
          type: 'text',
          placeholder: 'email',
        },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        console.log(user);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  // submit 버튼을 눌렀을 때 로그인 로직을 수행하고 마지막에 실행되는 부분
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    // session에 token 추가
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  // 커스텀 페이지 추가
  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };
