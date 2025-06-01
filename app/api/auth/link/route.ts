import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';

export async function POST(req: Request) {
  try {
    const { userId, providerId, providerAccountId } = await req.json();

    const exists = await prisma.account.findUnique({
      where: { provider_providerAccountId: { provider: providerId, providerAccountId } },
    });
    if (exists) {
      return NextResponse.json({ message: '이미 연결된 계정입니다.' }, { status: 400 });
    }

    await prisma.account.create({
      data: {
        userId: Number(userId),
        provider: providerId,
        providerAccountId,
        type: 'oauth',
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
