import Image from 'next/image';
import banner from '@/assets/banner/banner.webp';
import Posts from '@/components/Posts';
import BestPosts from '@/components/BestPosts';

export default function Home() {
  return (
    <>
      <div className='pt-16'>
        {/* 배너 영역 */}
        <div className='w-full sm:p-10 p-5 rounded-lg overflow-hidden'>
          <div className='relative w-full h-28 sm:h-72'>
            <Image src={banner} alt='banner' fill className='rounded-lg object-cover' />
          </div>
        </div>

        {/* 게시글 영역: 모바일 기본은 세로 스택, sm 이상부터 가로 정렬 */}
        <div className='w-full px-5 pb-5 sm:flex sm:space-x-4'>
          {/* 좌측: Posts (모바일에서는 w-full, sm 이상에서는 2/3) */}
          <div className='w-full sm:w-2/3'>
            <Posts />
          </div>
          {/* 우측: BestPosts (모바일에서는 w-full, sm 이상에서는 1/3) */}
          <div className='w-full sm:w-1/3'>
            <BestPosts />
          </div>
        </div>
      </div>
    </>
  );
}
