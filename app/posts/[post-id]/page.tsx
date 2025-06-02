import React from 'react';
import { prisma } from '@/lib/prismaClient';
import { notFound } from 'next/navigation';
import PostContent from './_components/PostContent';

interface PostPageProps {
  params: {
    'post-id': string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const rawId = params['post-id'];

  const postId = Number(rawId);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
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

  if (!post) {
    notFound();
  }

  return (
    <>
      <PostContent post={post} />
    </>
  );
}
