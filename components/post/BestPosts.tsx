'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import fireIcon from '@/assets/icons/fireIcon.svg';

interface BestPost {
  id: number;
  title: string;
  author: {
    name: string | null;
  };
}

export default function BestPosts() {
  const [bestPosts, setBestPosts] = useState<BestPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/best-posts', {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        setBestPosts(data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className='flex flex-col mt-5 sm:mt-0 sm:px-5 w-full sm:border-l-[1px] sm:border-gray-300 sm:min-h-screen sm:mx-5 sm:border-t-0 border-t-[1px] border-gray-300'>
        <div className='text-sm text-gray-500 mb-5 mt-5 sm:mt-0 font-semibold'>
          <div className='flex gap-2'>
            <Image src={fireIcon} alt='fire' className='w-5 h-5' /> <p>인기 있는 글</p>
          </div>
        </div>

        <div className='flex flex-col gap-6 sm:pr-5'>
          {bestPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className='flex flex-col gap-3 cursor-pointer border-[1px] border-gray-200 rounded-lg p-3 shadow-sm hover:bg-gray-50 transition'>
                <p className='text-base font-semibold line-clamp-2'>{post.title}</p>
                <p className='text-sm text-gray-500'>{post.author?.name ?? '익명'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
