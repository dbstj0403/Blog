import { prisma } from '@/lib/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

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
    // 1. 게시글 존재 확인 및 권한 체크
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!existingPost || existingPost.authorId !== userId) {
      return NextResponse.json({ message: 'Not authorized or post not found' }, { status: 403 });
    }

    // 2. Post 내용 업데이트
    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        modified_at: new Date(), // 자동으로 되긴 하지만 명시적 업데이트
      },
    });

    // 3. 카테고리 처리: 존재하면 사용, 없으면 생성
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

    // 4. 기존 카테고리 관계 삭제
    await prisma.postCategory.deleteMany({
      where: { postId },
    });

    // 5. 새 카테고리 관계 생성
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
