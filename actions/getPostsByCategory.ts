import { PostWithAuthor } from '@/types/post/post';
import { prisma } from '@/lib/prismaClient';

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
