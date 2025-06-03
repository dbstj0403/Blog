import Image from "next/image";
import getCategories from "@/actions/getCategories";
import {
  getPostsByCategory,
  PostWithAuthor,
} from "@/actions/getPostsByCategory";
import banner from "@/assets/banner/banner.webp";
import BestPosts from "@/components/post/BestPosts";
import Posts from "@/components/post/Posts";

export default async function Home() {
  const categories = await getCategories();
  const allPostsPromise = await getPostsByCategory("all");

  const postsByCategoryPromises = categories.map(async (cat) => {
    const key = cat.category_name.toLowerCase();
    const posts = await getPostsByCategory(cat.category_name);
    return { key, posts };
  });

  const [allPosts, ...perCategory] = await Promise.all([
    allPostsPromise,
    ...postsByCategoryPromises,
  ]);

  const postsByCategory: Record<string, PostWithAuthor[]> = {
    all: allPosts,
  };
  perCategory.forEach((item) => {
    postsByCategory[item.key] = item.posts;
  });

  return (
    <>
      <div className="pt-16">
        <div className="w-full sm:p-10 p-5 rounded-lg overflow-hidden">
          <div className="relative w-full h-28 sm:h-72">
            <Image
              src={banner}
              alt="banner"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="w-full px-5 pb-5 sm:flex sm:space-x-4">
          <div className="w-full sm:w-2/3">
            <Posts categories={categories} postsByCategory={postsByCategory} />
          </div>

          <div className="w-full sm:w-1/3">
            <BestPosts />
          </div>
        </div>
      </div>
    </>
  );
}
