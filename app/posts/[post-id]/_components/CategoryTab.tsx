"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryTabProps {
  categories: {
    category_name: string;
    postCount: number;
  }[];
  currentCategory?: string;
}

const CategoryTab = ({ categories, currentCategory }: CategoryTabProps) => {
  return (
    <div className="w-full bg-black text-gray-300 px-8 pt-16 mt-10 min-h-screen space-y-6 h-full">
      <div>
        <h2 className="text-white text-lg font-semibold mb-3">카테고리 목록</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.category_name}>
              <Link
                href={`/category/${cat.category_name}`}
                className={cn(
                  "block px-2 py-1 text-base rounded-md",
                  cat.category_name === currentCategory
                    ? "text-white font-bold"
                    : "text-gray-400 hover:text-white",
                )}
              >
                {cat.category_name} ({cat.postCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryTab;
