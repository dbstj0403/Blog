import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prismaClient';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, content, category } = await req.json();

  if (!title || !category) {
    return NextResponse.json({ message: '제목과 카테고리는 필수입니다.' }, { status: 400 });
  }

  // ✅ 1. 카테고리 존재 여부 확인
  let existingCategory = await prisma.category.findUnique({
    where: { category_name: category },
  });

  // ✅ 2. 없다면 새로 생성
  if (!existingCategory) {
    existingCategory = await prisma.category.create({
      data: { category_name: category },
    });
  }

  // ✅ 3. 포스트 생성 + 카테고리 연결
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { id: Number(user.id) } }, // ← 여기 수정됨!
      categories: {
        create: [
          {
            category: { connect: { id: existingCategory.id } },
          },
        ],
      },
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}
