import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';

// 2글자 이상 토큰에 * 추가
function makeBooleanWildcard(q: string) {
  return q
    .trim()
    .split(/\s+/)
    .filter((w) => w.length >= 2)
    .map((w) => `${w}*`)
    .join(' ');
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('q')?.trim() ?? '';

  if (raw.length < 2)
    return NextResponse.json({ message: '검색어는 두 글자 이상이어야 합니다.' }, { status: 400 });

  const limit = Math.max(1, Number(searchParams.get('limit') ?? 20));
  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  const offset = (page - 1) * limit;
  const boolean = makeBooleanWildcard(raw);

  try {
    /* author 정보까지 가져오기 */
    const rows = await prisma.$queryRawUnsafe<
      {
        post_id: number;
        title: string;
        content: string | null;
        like_count: number;
        dislike_count: number;
        created_at: Date;
        modified_at: Date;
        author_id: number;
        author_name: string | null;
        author_image: string | null;
      }[]
    >(
      `
      SELECT
        p.post_id,
        p.title, p.content,
        p.like_count, p.dislike_count,
        p.created_at, p.modified_at,
        u.id   AS author_id,
        u.name AS author_name,
        u.image AS author_image
      FROM posts AS p
      JOIN users AS u ON u.id = p.author_id
      WHERE MATCH(p.title, p.content) AGAINST (? IN BOOLEAN MODE)
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
      `,
      boolean,
      limit,
      offset,
    );

    /* → Post 컴포넌트가 기대하는 형태로 변환 */
    const posts = rows.map((r) => ({
      id: r.post_id,
      title: r.title,
      content: r.content,
      like_count: r.like_count,
      dislike_count: r.dislike_count,
      created_at: r.created_at,
      modified_at: r.modified_at,
      author: {
        id: r.author_id,
        name: r.author_name,
        image: r.author_image,
      },
    }));

    return NextResponse.json({ data: posts, page, limit });
  } catch (e) {
    console.error('[BOOLEAN SEARCH]', e);
    return NextResponse.json({ message: '검색 실패' }, { status: 500 });
  }
}
