import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { getCategoryCounts } from '@/actions/getCategoryCounts';
import { getPostDetail } from '@/actions/getPostDetail';
import { ReactionType } from '@prisma/client';
import { authOptions } from '@/lib/auth';
import CategoryTab from './_components/CategoryTab';
import PostContent from './_components/PostContent';

interface PostPageProps {
  params: { 'post-id': string };
}

export default async function PostPage({ params }: PostPageProps) {
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id ? Number(session.user.id) : null;
  const { 'post-id': rawId } = await params;
  const postId = await Number(rawId);
  if (isNaN(postId)) notFound();

  const post = await getPostDetail(postId, currentUserId);

  if (!post) notFound();

  const myReaction =
    currentUserId && post.reactions?.[0]
      ? (ReactionType[post.reactions[0].type] as 'LIKE' | 'DISLIKE')
      : null;

  const { totalCount, categories } = await getCategoryCounts();
  const selectedCategory = post.categories[0]?.category.category_name ?? '전체';

  return (
    <>
      <div className='flex gap-5 w-full items-stretch'>
        <div className='w-[25%] self-stretch'>
          <CategoryTab
            categories={[{ category_name: 'All', postCount: totalCount }, ...categories]}
            currentCategory={selectedCategory}
          />
        </div>

        <div className='w-[75%]'>
          <PostContent
            post={{
              ...post,
              myReaction,
            }}
          />
        </div>
      </div>
    </>
  );
}
