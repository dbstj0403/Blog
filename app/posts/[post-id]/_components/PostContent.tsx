'use client';

import { useState, useTransition, useCallback } from 'react';
import convertDateFormat from '@/utils/convertDateFormat';
import Image from 'next/image';

import thumbsup from '@/assets/icons/thumbsupIcon.svg';
import thumbsdown from '@/assets/icons/thumbsdownIcon.svg';

interface PostContentProps {
  post: {
    id: number;
    title: string;
    content: string | null;
    created_at: Date | string;
    modified_at: Date | string;
    like_count: number;
    dislike_count: number;
    myReaction: 'LIKE' | 'DISLIKE' | null;
    categories: Array<{
      categoryId: number;
      category: { category_name: string };
    }>;
  };
}

export default function PostContent({ post }: PostContentProps) {
  const {
    id,
    title,
    content,
    created_at,
    modified_at,
    like_count,
    dislike_count,
    myReaction: initialReaction,
    categories,
  } = post;

  const [likes, setLikes] = useState(like_count);
  const [dislikes, setDislikes] = useState(dislike_count);
  const [myReaction, setMyReaction] = useState<'LIKE' | 'DISLIKE' | null>(initialReaction);
  const created = convertDateFormat(created_at);
  const modified = convertDateFormat(modified_at);

  const [isPending, startTransition] = useTransition();

  const request = useCallback(
    async (type: 'LIKE' | 'DISLIKE') => {
      const res = await fetch('/api/reaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id, type }),
      });
      if (!res.ok) throw new Error();
      return (await res.json()) as {
        like_count: number;
        dislike_count: number;
        myReaction: 'LIKE' | 'DISLIKE' | null;
      };
    },
    [post.id],
  );

  const handle = (type: 'LIKE' | 'DISLIKE') => {
    let dLike = 0;
    let dDis = 0;
    let next: 'LIKE' | 'DISLIKE' | null = myReaction;

    if (myReaction === type) {
      next = null;
      if (type === 'LIKE') dLike = -1;
      else dDis = -1;
    } else {
      next = type;
      if (type === 'LIKE') {
        dLike = 1;
        if (myReaction === 'DISLIKE') dDis = -1;
      } else {
        dDis = 1;
        if (myReaction === 'LIKE') dLike = -1;
      }
    }

    setLikes((v) => v + dLike);
    setDislikes((v) => v + dDis);
    setMyReaction(next);

    startTransition(async () => {
      try {
        const latest = await request(type);
        setLikes(latest.like_count);
        setDislikes(latest.dislike_count);
        setMyReaction(latest.myReaction);
      } catch {
        setLikes((v) => v - dLike);
        setDislikes((v) => v - dDis);
        setMyReaction(myReaction);
        alert('오류가 발생했습니다.');
      }
    });
  };

  return (
    <div className='pt-16 mt-10 flex justify-center px-4 pb-15'>
      <div className='max-w-3xl w-full flex flex-col gap-5'>
        <h1 className='font-bold text-3xl'>{title}</h1>

        <div className='flex gap-2'>
          {categories.map((c) => (
            <span
              key={c.categoryId}
              className='rounded-full bg-gray-200 px-3 py-2 text-sm text-gray-700'
            >
              #{c.category.category_name}
            </span>
          ))}
        </div>

        <div className='text-sm text-gray-600 flex flex-col gap-1 pl-2 mb-10'>
          <span>김영호</span>
          <span>작성일 : {created}</span>
          <span>마지막 수정일 : {modified}</span>
        </div>

        <div className='pl-3 whitespace-pre-wrap'>{content}</div>

        <div className='mt-15 flex gap-4 justify-center'>
          <button
            disabled={isPending}
            onClick={() => handle('LIKE')}
            className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm cursor-pointer font-medium transition
      ${
        myReaction === 'LIKE'
          ? 'bg-green-600 text-white shadow'
          : 'bg-white text-hana-green border-[2px] border-hana-green'
      }
      disabled:opacity-50 focus:outline-none`}
          >
            <Image src={thumbsup} alt='like' className='w-5 h-5' /> <span>{likes}</span>
          </button>

          <button
            disabled={isPending}
            onClick={() => handle('DISLIKE')}
            className={`flex items-center gap-2 rounded-lg px-5 py-2 cursor-pointer text-sm font-medium transition
      ${
        myReaction === 'DISLIKE'
          ? 'bg-gray-400 text-white shadow'
          : 'bg-white text-gray-700 border-[2px] border-gray-400'
      }
      disabled:opacity-50 focus:outline-none`}
          >
            <Image src={thumbsdown} alt='like' className='w-5 h-5' /> <span>{dislikes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
