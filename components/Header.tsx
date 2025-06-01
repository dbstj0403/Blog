'use client';
import logoIcon from '@/assets/icons/logoIcon.png';
import searchIcon from '@/assets/icons/searchIcon.svg';
import profileIcon from '@/assets/icons/profileIcon.svg';
import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <div className='w-full h-16 fixed top-0 bg-white flex items-center px-3 justify-between shadow-sm z-50'>
      <div className='flex gap-2 items-center'>
        <Image src={logoIcon} alt='logo' className='w-10 h-10 sm:w-12 sm:h-12' />
        <p className='font-semibold text-sm sm:text-lg'>Digital Hanaro Tech</p>
      </div>

      <div className='flex gap-3 items-center'>
        <Button variant='login' onClick={() => router.push('/login')}>
          로그인
        </Button>
        <Button variant='signup' onClick={() => router.push('/signup')}>
          회원가입
        </Button>
        <Image src={searchIcon} alt='search' className='cursor-pointer w-4 h-4 sm:w-6 sm:h-6' />
        <Image src={profileIcon} alt='profile' className='cursor-pointer w-5 h-5 sm:w-7 sm:h-7' />
      </div>
    </div>
  );
};

export default Header;
