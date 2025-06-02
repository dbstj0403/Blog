import Image from 'next/image';
import banner from '@/assets/banner/banner.webp';
import Posts from '@/components/post/Posts';
import BestPosts from '@/components/post/BestPosts';

export default function Home() {
  return (
    <>
      <div className='pt-16'>
        <div className='w-full sm:p-10 p-5 rounded-lg overflow-hidden'>
          <div className='relative w-full h-28 sm:h-72'>
            <Image src={banner} alt='banner' fill className='rounded-lg object-cover' />
          </div>
        </div>

        <div className='w-full px-5 pb-5 sm:flex sm:space-x-4'>
          <div className='w-full sm:w-2/3'>
            <Posts />
          </div>

          <div className='w-full sm:w-1/3'>
            <BestPosts />
          </div>
        </div>
      </div>
    </>
  );
}
