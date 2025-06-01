import Header from '@/components/Header';
import Image from 'next/image';
import banner from '@/assets/banner/banner.webp';

export default function Home() {
  return (
    <>
      <Header />
      <div className='pt-16'>
        <div className='w-full sm:p-10 p-5 rounded-lg overflow-hidden'>
          <div className='relative w-full h-28 sm:h-72'>
            <Image src={banner} alt='banner' fill className='rounded-lg object-cover' />
          </div>
        </div>
      </div>
    </>
  );
}
