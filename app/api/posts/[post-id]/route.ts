// app/api/posts/[postId]/route.ts

import { prisma } from '@/lib/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { 'post-id': string } }) {
  const postId = Number(params['post-id']);
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
