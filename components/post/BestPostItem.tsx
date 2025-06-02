'use client';

import { useRouter } from 'next/navigation';

const Post = () => {
  const router = useRouter();
  return (
    <>
      <div className='flex flex-col' onClick={() => router.push('/posts/1')}>
        <p className='font-semibold text-lg mb-1'>
          토스는 어떻게 광고를 보여줄까? 토스애즈 ML 톺아보기
        </p>
        <p className='text-gray-500 text-sm mb-5'>
          토스앱의 다양한 광고는 어떤 과정을 거쳐 유저에게 노출될까요?
        </p>
        <p className='text-xs text-gray-500'>2025년 4월 23일 · 김영호</p>
      </div>
    </>
  );
};

export default Post;
