// lib/auth.ts
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { Adapter, AdapterUser, Account as NextAuthAccount } from 'next-auth/adapters';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from './prismaClient';

const defaultAdapter = PrismaAdapter(prisma);

const CustomAdapter = (): Adapter => ({
  ...defaultAdapter,

  // 최초 OAuth 로그인 시 한 번만 호출됩니다.
  async createUser(user: Omit<AdapterUser, 'id'>) {
    // 1) DB에 user_id PK로 레코드 생성
    const dbUser = await prisma.user.create({
      data: {
        email: user.email!,
        nickname: user.name ?? undefined,
        provider: 'github',
      },
    });
    // 2) NextAuth가 기대하는 AdapterUser 형태로 반환
    return {
      id: dbUser.user_id, // <--- user_id를 id로 매핑
      name: dbUser.nickname ?? null,
      email: dbUser.email!,
      emailVerified: null, // OAuth는 null 혹은 Date 사용
      image: null,
    };
  },

  // createUser 후 계정 연결 시 호출됩니다.
  async linkAccount(account: NextAuthAccount) {
    return prisma.account.create({
      data: {
        provider: account.provider,
        type: account.type,
        providerAccountId: account.providerAccountId,
        refresh_token: account.refresh_token,
        access_token: account.access_token,
        expires_at: account.expires_at,
        token_type: account.token_type,
        scope: account.scope,
        id_token: account.id_token,
        session_state: account.session_state,
        // 여기 userId 대신, account.userId 에 들어온 id (즉 user_id)를 써서 연결
        user: {
          connect: { user_id: account.userId! },
        },
      },
    });
  },
});

export const authOptions: NextAuthOptions = {
  adapter: CustomAdapter(),

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  session: {
    strategy: 'database',
  },

  callbacks: {
    async session({ session, user }) {
      // user.id는 내부에서 user_id로부터 매핑된 값입니다.
      session.user.id = user.id;
      session.user.name = user.name; // nickname이 들어갑니다
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
