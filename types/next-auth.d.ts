import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string | null;
      role: string;
      email: string;
      name: string;
      image: string;
    };
  }

  interface Profile {
    avatar_url: string;
  }

  interface User {
    id: string;
    role?: string;
  }
}
