// app/api/best-posts/route.ts
import { prisma } from '@/lib/prismaClient';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: [{ like_count: 'desc' }, { created_at: 'desc' }],
    take: 5,
    include: {
      author: {
        select: { name: true },
      },
      categories: {
        include: {
          category: { select: { category_name: true } },
        },
      },
    },
  });

  return NextResponse.json(posts);
}
