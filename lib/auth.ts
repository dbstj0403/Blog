import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import { compare } from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from './prismaClient';
import { Provider as ProviderEnum } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(creds) {
        if (!creds?.email || !creds.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: creds.email },
        });
        if (!user?.password) return null;

        const ok = await compare(creds.password, user.password);
        if (!ok) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name ?? user.email,
          image: user.image ?? null,
        };
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token }) {
      const userInDb = await prisma.user.findUnique({
        where: { email: token.email as string },
      });

      if (userInDb) {
        token.name = userInDb.name;
        token.role = userInDb.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.sub) session.user.id = token.sub;
      if (token?.email) session.user.email = token.email as string;
      if (token?.name) session.user.name = token.name as string;
      if (token?.picture) session.user.image = token.picture as string;
      if (token?.role) session.user.role = token.role as string;
      return session;
    },

    async signIn({ user, account, profile }) {
      if (account?.provider === 'github') {
        const existing = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existing && !existing.image && profile?.avatar_url) {
          await prisma.user.update({
            where: { id: existing.id },
            data: {
              image: profile.avatar_url,
            },
          });
        }

        if (existing && existing.provider !== 'GITHUB') {
          await prisma.user.update({
            where: { id: existing.id },
            data: {
              provider: 'GITHUB',
            },
          });
        }

        // 연동 확인 흐름 유지
        const linked = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (linked) return true;

        if (existing) {
          return (
            `/auth/confirm-link?userId=${existing.id}` +
            `&providerId=${account.provider}` +
            `&providerAccountId=${account.providerAccountId}`
          );
        }
      }

      return true;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/`;
    },
  },

  events: {
    /** GitHub 계정이 연결(최초·재로그인 모두)된 직후 호출 */
    async linkAccount({ user, account }) {
      if (account.provider === 'github' && user.provider !== 'GITHUB') {
        await prisma.user.update({
          where: { id: user.id },
          data: { provider: ProviderEnum.GITHUB }, // ← enum 값으로!
        });
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
