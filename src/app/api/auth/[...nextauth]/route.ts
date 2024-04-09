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
});

export { handler as GET, handler as POST };
