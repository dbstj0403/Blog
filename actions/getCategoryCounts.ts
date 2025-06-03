import { prisma } from "@/lib/prismaClient";

export async function getCategoryCounts() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  const totalCount = await prisma.post.count();

  return {
    totalCount,
    categories: categories.map((cat) => ({
      category_name: cat.category_name,
      postCount: cat._count.posts,
    })),
  };
}
