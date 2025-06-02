import { prisma } from '@/lib/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import PostContent from './_components/PostContent';
import { notFound } from 'next/navigation';
import { ReactionType } from '@prisma/client';

interface PostPageProps {
  params: { 'post-id': string };
}

export default async function PostPage({ params }: PostPageProps) {
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id ? Number(session.user.id) : null;

  const postId = Number(params['post-id']);
  if (isNaN(postId)) notFound();

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: { id: true, name: true, image: true },
      },
      categories: {
        include: {
          category: {
            select: { category_name: true },
          },
        },
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

  if (!post) notFound();

  const myReaction =
    currentUserId && post.reactions?.[0]
      ? (ReactionType[post.reactions[0].type] as 'LIKE' | 'DISLIKE')
      : null;

  return (
    <PostContent
      post={{
        ...post,
        myReaction,
      }}
    />
  );
}
