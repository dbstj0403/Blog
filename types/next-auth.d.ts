// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      role: string;
      email: string;
    };
  }

  interface User {
    id: number;
    role: string;
  }
}
