import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = Number(params.id);

  if (isNaN(userId)) {
    return NextResponse.json({ message: '유효하지 않은 ID입니다.' }, { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: '삭제 성공' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '삭제 실패', error }, { status: 500 });
  }
}
