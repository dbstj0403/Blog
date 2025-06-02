'use client';

import { useRouter } from 'next/navigation';

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

  // content가 null일 수도 있으니 빈 문자열로 대체
  const rawContent = post.content ?? '';
  // 20자까지 잘라서, 더 길면 '...' 붙이기
  const preview = rawContent.length > 20 ? rawContent.slice(0, 20) + '...' : rawContent;

  // 날짜를 한국어 형식(예: "2025년 4월 23일")으로 포맷
  const createdDate = new Date(post.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const authorName = post.author.name ?? '익명';

  return (
    <div className='flex flex-col cursor-pointer' onClick={() => router.push(`/posts/${post.id}`)}>
      <p className='font-semibold text-lg mb-1'>{post.title}</p>
      <p className='text-gray-500 text-sm mb-1'>{preview}</p>
      <p className='text-xs text-gray-500'>
        {createdDate} · {authorName}
      </p>
    </div>
  );
}
