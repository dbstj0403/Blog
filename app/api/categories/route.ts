import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { category_name: 'asc' },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('[/api/categories] DB 조회 중 오류:', error);
    return NextResponse.json(
      { message: '카테고리 조회 중 서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
