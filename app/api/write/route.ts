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

  // ✅ 카테고리 문자열 → 배열로 분리 (공백 기준)
  const categoryList = category
    .split(/\s+/) // 공백 1개 이상 기준 분할
    .map((c: string) => c.trim())
    .filter((c: string) => c.length > 0);

  const connectedCategories = [];

  for (const cat of categoryList) {
    let existing = await prisma.category.findUnique({
      where: { category_name: cat },
    });

    if (!existing) {
      existing = await prisma.category.create({
        data: { category_name: cat },
      });
    }

    connectedCategories.push({
      category: { connect: { id: existing.id } },
    });
  }

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { id: Number(user.id) } },
      categories: {
        create: connectedCategories,
      },
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}
