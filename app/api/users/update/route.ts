// app/api/users/update/route.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prismaClient';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await req.json();

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ message: '유효한 이름을 입력해주세요.' }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id: Number(session.user.id) },
    data: { name },
  });

  return NextResponse.json({ message: '닉네임이 수정되었습니다.', user: updated });
}
