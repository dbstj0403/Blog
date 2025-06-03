import { ReactionType } from '@prisma/client';
import { prisma } from '@/lib/prismaClient';

export async function getPostDetail(postId: number, currentUserId: number | null) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: { select: { id: true, name: true, image: true } },
      categories: {
        include: { category: { select: { category_name: true } } },
      },
      reactions: currentUserId
        ? {
            where: { userId: currentUserId },
            select: { type: true },
            take: 1,
          }
        : false,
    },
  });

  if (!post) return null;

  const myReaction =
    currentUserId && post.reactions?.[0]
      ? (ReactionType[post.reactions[0].type] as 'LIKE' | 'DISLIKE')
      : null;

  return {
    ...post,
    myReaction,
  };
}
