import { prisma } from '@/lib/prismaClient';

export async function getBestPosts(limit = 5) {
  const posts = await prisma.post.findMany({
    orderBy: [{ like_count: 'desc' }, { created_at: 'desc' }],
    take: limit,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      categories: {
        include: {
          category: {
            select: {
              category_name: true,
            },
          },
        },
      },
    },
  });

  return posts;
}
