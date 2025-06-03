'use client';

import { useRouter } from 'next/navigation';
import { PostWithAuthor } from '@/types/post/post';
import convertDateFormat from '@/utils/convertDateFormat';

interface PostProps {
  post: PostWithAuthor;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  const rawContent = post.content ?? '';

  const preview = rawContent.length > 20 ? rawContent.slice(0, 50) + '...' : rawContent;

  const createdDate = convertDateFormat(post.created_at);

  const authorName = post.author.name ?? '익명';

  return (
    <div
      className='flex flex-col cursor-pointer border-[1px] border-gray-200 rounded-lg p-3 shadow-sm hover:bg-gray-50 transition'
      onClick={() => router.push(`/posts/${post.id}`)}
    >
      <p className='font-semibold text-lg mb-2'>{post.title}</p>
      <p className='text-gray-500 text-sm mb-5'>{preview}</p>
      <p className='text-xs text-gray-500'>
        {createdDate} · {authorName}
      </p>
    </div>
  );
}
