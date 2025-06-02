import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // ← 경로 맞게 수정
import { prisma } from '@/lib/prismaClient';

// 허용 타입
const ALLOWED = ['LIKE', 'DISLIKE'] as const;
type Reaction = (typeof ALLOWED)[number];

// 공통 JSON 응답
const err = (msg: string, status = 400) => NextResponse.json({ message: msg }, { status });

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
  /* 1. 로그인 확인 ---------------------------------------------------------- */
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return err('Unauthorized', 401);

  const userId = Number(session.user.id);
  if (isNaN(userId)) return err('Invalid user id', 400);

  /* 2. 파라미터·바디 파싱 --------------------------------------------------- */
  const postId = Number(params.postId);
  if (isNaN(postId)) return err('Invalid post id');

  let body: { type?: unknown };
  try {
    body = await req.json();
  } catch {
    return err('Invalid JSON');
  }

  // 대소문자 무시
  const raw = String(body.type ?? '').toUpperCase();
  if (!ALLOWED.includes(raw as Reaction)) return err('type must be LIKE or DISLIKE');

  const type = raw as Reaction;

  /* 3. 트랜잭션 ------------------------------------------------------------- */
  try {
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.postReaction.findFirst({
        where: { userId, postId },
      });

      /* a) 새 반응 --------------------------------------------------------- */
      if (!existing) {
        await tx.postReaction.create({ data: { userId, postId, type } });
        if (type === 'LIKE') {
          await tx.post.update({
            where: { id: postId },
            data: { like_count: { increment: 1 } },
          });
        } else {
          await tx.post.update({
            where: { id: postId },
            data: { dislike_count: { increment: 1 } },
          });
        }
      } else if (existing.type === type) {

      /* b) 같은 타입 → 아무 것도 안 함 ------------------------------------ */
        // noop
      } else {

      /* c) 타입 변경 -------------------------------------------------------- */
        await tx.postReaction.update({
          where: { id: existing.id },
          data: { type },
        });
        if (type === 'LIKE') {
          await tx.post.update({
            where: { id: postId },
            data: {
              like_count: { increment: 1 },
              dislike_count: { decrement: 1 },
            },
          });
        } else {
          await tx.post.update({
            where: { id: postId },
            data: {
              like_count: { decrement: 1 },
              dislike_count: { increment: 1 },
            },
          });
        }
      }

      // ★ 최신 카운트 읽어서 반환
      const { like_count, dislike_count } = await tx.post.findUniqueOrThrow({
        where: { id: postId },
        select: { like_count: true, dislike_count: true },
      });

      return { like_count, dislike_count };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.error('[reaction]', e);
    return err('Server error', 500);
  }
}
