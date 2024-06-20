import NextAuth, { AuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
// import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

interface ExtendedUser extends Record<string, any> {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signIn`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.data && response.data.user) {
            const user: ExtendedUser = {
              id: response.data.user.id,
              name: response.data.user.name,
              email: response.data.user.email,
              accessToken: response.data.token,
            };
            return user;
          }
          return null;
        } catch (error) {
          console.error('Error in authorization:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async session({ session, token }) {
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
        accessToken: token.accessToken as string,
        exp: token.exp as number,
      };
      return updatedSession;
    },
    async jwt({ token, user }) {
      const updatedToken = { ...token };
      if (user) {
        updatedToken.id = (user as ExtendedUser).id;
        updatedToken.accessToken = (user as ExtendedUser).accessToken;
        updatedToken.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 1 day in seconds
      }
      return updatedToken;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
