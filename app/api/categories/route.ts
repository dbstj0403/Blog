// pages/api/categories.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // GET 요청만 허용
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Prisma Client를 사용해 categories 테이블에서 모든 항목을 조회
    const categories = await prisma.category.findMany({
      orderBy: { category_name: "asc" }, // 필요에 따라 정렬 조건 조정 가능
    });

    return res.status(200).json(categories);
  } catch (error: any) {
    console.error("[/api/categories] DB 조회 중 오류:", error);
    return res
      .status(500)
      .json({ message: "카테고리 조회 중 서버 오류가 발생했습니다." });
  }
}
