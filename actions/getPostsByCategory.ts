import { prisma } from '@/lib/prismaClient';

export type PostWithAuthor = {
  id: number;
  title: string;
  content: string | null;
  like_count: number;
  dislike_count: number;
  created_at: Date;
  modified_at: Date;
  author: {
    id: number;
    name: string | null;
    image: string | null;
  };
};

export async function getPostsByCategory(categoryName: string): Promise<PostWithAuthor[]> {
  if (categoryName === 'all') {
    return prisma.post.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        author: {
          select: { id: true, name: true, image: true },
        },
      },
    });
  }

  return prisma.post.findMany({
    where: {
      categories: {
        some: {
          category: {
            category_name: categoryName,
          },
        },
      },
    },
    orderBy: { created_at: 'desc' },
    include: {
      author: {
        select: { id: true, name: true, image: true },
      },
    },
  });
}
