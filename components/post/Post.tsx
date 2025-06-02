'use client';

import { useRouter } from 'next/navigation';
import convertDateFormat from '@/utils/convertDateFormat';

interface PostWithAuthor {
  id: number;
  title: string;
  content: string | null;
  like_count: number;
  dislike_count: number;
  created_at: Date;
  modified_at: Date;
  author: {
    id: number;
    name: string | null;
    image: string | null;
  };
}

interface PostProps {
  post: PostWithAuthor;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  const rawContent = post.content ?? '';

  const preview = rawContent.length > 20 ? rawContent.slice(0, 20) + '...' : rawContent;

  const createdDate = convertDateFormat(post.created_at);

  const authorName = post.author.name ?? '익명';

  return (
    <div className='flex flex-col cursor-pointer' onClick={() => router.push(`/posts/${post.id}`)}>
      <p className='font-semibold text-lg mb-2'>{post.title}</p>
      <p className='text-gray-500 text-sm mb-5'>{preview}</p>
      <p className='text-xs text-gray-500'>
        {createdDate} · {authorName}
      </p>
    </div>
  );
}
