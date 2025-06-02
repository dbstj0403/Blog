import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prismaClient';

const ALLOWED = ['LIKE', 'DISLIKE'] as const;
type Reaction = (typeof ALLOWED)[number];
const err = (m: string, s = 400) => NextResponse.json({ message: m }, { status: s });

export async function POST(req: NextRequest) {
  /* ── 1. 인증 ─────────────────────────────────────────────── */
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return err('Unauthorized', 401);
  const userId = Number(session.user.id);
  if (isNaN(userId)) return err('Invalid user id', 400);

  /* ── 2. 입력 파싱 ─────────────────────────────────────────── */
  let body: { postId?: unknown; type?: unknown };
  try {
    body = await req.json();
  } catch {
    return err('Invalid JSON');
  }
  const postId = Number(body.postId);
  if (isNaN(postId)) return err('postId must be number');
  const raw = String(body.type ?? '').toUpperCase() as Reaction;
  if (!ALLOWED.includes(raw)) return err('type must be LIKE or DISLIKE');
  const type = raw;

  /* ── 3. 트랜잭션 ─────────────────────────────────────────── */
  try {
    const { like_count, dislike_count, myReaction } = await prisma.$transaction(async (tx) => {
      const existing = await tx.postReaction.findFirst({
        where: { userId, postId },
      });

      /* a) 반응이 없었다 → 새로 생성 */
      if (!existing) {
        await tx.postReaction.create({ data: { userId, postId, type } });
        if (type === 'LIKE')
          await tx.post.update({
            where: { id: postId },
            data: { like_count: { increment: 1 } },
          });
        else
          await tx.post.update({
            where: { id: postId },
            data: { dislike_count: { increment: 1 } },
          });
      } else if (existing.type === type) {

      /* b) 같은 타입을 다시 눌렀다 → 삭제(취소) */
        await tx.postReaction.delete({ where: { id: existing.id } });
        if (type === 'LIKE')
          await tx.post.update({
            where: { id: postId },
            data: { like_count: { decrement: 1 } },
          });
        else
          await tx.post.update({
            where: { id: postId },
            data: { dislike_count: { decrement: 1 } },
          });
      } else {

      /* c) 다른 타입으로 변경 */
        await tx.postReaction.update({
          where: { id: existing.id },
          data: { type },
        });
        if (type === 'LIKE')
          await tx.post.update({
            where: { id: postId },
            data: {
              like_count: { increment: 1 },
              dislike_count: { decrement: 1 },
            },
          });
        else
          await tx.post.update({
            where: { id: postId },
            data: {
              like_count: { decrement: 1 },
              dislike_count: { increment: 1 },
            },
          });
      }

      /* 최신 카운트 + 나의 반응 상태 반환 */
      const p = await tx.post.findUniqueOrThrow({
        where: { id: postId },
        select: { like_count: true, dislike_count: true },
      });
      const latest = await tx.postReaction.findFirst({
        where: { userId, postId },
        select: { type: true },
      });

      return {
        like_count: p.like_count,
        dislike_count: p.dislike_count,
        myReaction: latest?.type ?? null,
      };
    });

    return NextResponse.json({ like_count, dislike_count, myReaction }, { status: 200 });
  } catch (e) {
    console.error('[POST /api/reaction]', e);
    return err('Server error', 500);
  }
}
