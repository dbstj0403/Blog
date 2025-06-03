import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';

// 공백 기준 토큰화 후 각 토큰에 '*'
function makeBooleanWildcard(query: string) {
  return query
    .trim()
    .split(/\s+/)
    .filter((w) => w.length >= 2) // 2글자 이상만
    .map((w) => `${w}*`) // 접두 와일드카드
    .join(' ');
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('q')?.trim() ?? '';

  if (raw.length < 2) {
    return NextResponse.json({ message: '검색어는 두 글자 이상이어야 합니다.' }, { status: 400 });
  }

  const limit = Math.max(1, Number(searchParams.get('limit') ?? 20));
  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  const offset = (page - 1) * limit;

  const booleanQuery = makeBooleanWildcard(raw); // ← '남자*'
  try {
    const rows = await prisma.$queryRawUnsafe<
      { post_id: number; title: string; snippet: string | null }[]
    >(
      `
      SELECT
        p.post_id,
        p.title,
        SUBSTRING_INDEX(p.content,' ',30) AS snippet
      FROM posts AS p
      WHERE MATCH(p.title, p.content) AGAINST (? IN BOOLEAN MODE)
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
      `,
      booleanQuery,
      limit,
      offset,
    );

    return NextResponse.json({ data: rows, page, limit });
  } catch (err) {
    console.error('[BOOLEAN SEARCH]', err);
    return NextResponse.json({ message: '검색 실패' }, { status: 500 });
  }
}
