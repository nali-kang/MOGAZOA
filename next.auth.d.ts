import 'next-auth';

declare module 'next-auth' {
  interface User {
    token?: string;
  }

  interface Session {
    accessToken?: string;
    exp?: number;
  }

  interface JWT {
    id?: string;
    accessToken?: string;
    exp?: number;
  }
}
