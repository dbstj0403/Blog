import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prismaClient';

export async function DELETE(req: Request, { params }: { params: { 'post-id': string } }) {
  const { ['post-id']: raw } = await params;
  const postId = Number(raw);
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (user?.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  if (isNaN(postId)) {
    return NextResponse.json({ message: 'Invalid postId' }, { status: 400 });
  }

  await prisma.post.delete({
    where: { id: postId },
  });

  return NextResponse.json({ message: '삭제 완료' }, { status: 200 });
}

export async function PATCH(req: Request, { params }: { params: { 'post-id': string } }) {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  const { ['post-id']: raw } = await params;
  const postId = Number(raw);

  if (!userId || isNaN(postId)) {
    return NextResponse.json({ message: 'Unauthorized or invalid ID' }, { status: 401 });
  }

  const body = await req.json();
  const {
    title,
    content,
    categoryNames,
  }: { title: string; content: string; categoryNames: string[] } = body;

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!existingPost || existingPost.authorId !== userId) {
      return NextResponse.json({ message: 'Not authorized or post not found' }, { status: 403 });
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        modified_at: new Date(),
      },
    });

    const categoryIds: number[] = [];

    for (const name of categoryNames) {
      const existing = await prisma.category.findUnique({
        where: { category_name: name },
      });

      if (existing) {
        categoryIds.push(existing.id);
      } else {
        const created = await prisma.category.create({
          data: { category_name: name },
        });
        categoryIds.push(created.id);
      }
    }

    await prisma.postCategory.deleteMany({
      where: { postId },
    });

    await prisma.postCategory.createMany({
      data: categoryIds.map((categoryId) => ({
        postId,
        categoryId,
      })),
    });

    return NextResponse.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('[PATCH /posts/:id]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
