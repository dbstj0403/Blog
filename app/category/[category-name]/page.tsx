import { notFound } from "next/navigation";
import { getCategoryCounts } from "@/actions/getCategoryCounts";
import CategoryTab from "@/app/posts/[post-id]/_components/CategoryTab";
import { prisma } from "@/lib/prismaClient";
import Posts from "../_components/Posts";

interface CategoryDetailPageProps {
  params: { "category-name": string };
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const categoryName = decodeURIComponent(params["category-name"]);

  const { totalCount, categories } = await getCategoryCounts();

  // '전체' 카테고리인 경우 전체 포스트 가져오기
  const posts =
    categoryName === "All"
      ? await prisma.post.findMany({
          include: {
            author: { select: { id: true, name: true, image: true } },
          },
          orderBy: { created_at: "desc" },
        })
      : await prisma.post.findMany({
          where: {
            categories: {
              some: {
                category: {
                  category_name: categoryName,
                },
              },
            },
          },
          include: {
            author: { select: { id: true, name: true, image: true } },
          },
          orderBy: { created_at: "desc" },
        });

  // 잘못된 카테고리로 접근 시 notFound 처리
  if (
    categoryName !== "All" &&
    !categories.find((c) => c.category_name === categoryName)
  ) {
    notFound();
  }

  return (
    <div className="flex gap-5 w-full items-stretch">
      <div className="w-[25%] self-stretch">
        <CategoryTab
          categories={[
            { category_name: "All", postCount: totalCount },
            ...categories,
          ]}
          currentCategory={categoryName}
        />
      </div>

      <div className="w-[75%]">
        <Posts posts={posts} categoryName={categoryName} />
      </div>
    </div>
  );
}
