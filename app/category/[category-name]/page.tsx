import { notFound } from 'next/navigation';
import { getCategoryCounts } from '@/actions/getCategoryCounts';
import { getPostsByCategory } from '@/actions/getPostsByCategory';
import CategoryTab from '@/app/posts/[post-id]/_components/CategoryTab';
import Posts from '../_components/Posts';

interface CategoryDetailPageProps {
  params: Promise<{ 'category-name': string }>;
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { 'category-name': rawCategoryName } = await params;
  const categoryName = decodeURIComponent(rawCategoryName);

  const { totalCount, categories } = await getCategoryCounts();
  const posts = await getPostsByCategory(categoryName);

  const isValidCategory =
    categoryName === 'All' || categories.some((c) => c.category_name === categoryName);
  if (!isValidCategory) notFound();

  return (
    <div className='flex gap-5 w-full items-stretch'>
      <div className='w-[25%] self-stretch'>
        <CategoryTab
          categories={[{ category_name: 'All', postCount: totalCount }, ...categories]}
          currentCategory={categoryName}
        />
      </div>

      <div className='w-[75%]'>
        <Posts posts={posts} categoryName={categoryName} />
      </div>
    </div>
  );
}
