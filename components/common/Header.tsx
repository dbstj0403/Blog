'use client';
import logoIcon from '@/assets/icons/logoIcon.png';
import searchIcon from '@/assets/icons/searchIcon.svg';
import profileIcon from '@/assets/icons/profileIcon.svg';
import editIcon from '@/assets/icons/editIcon.svg';

import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';
import { useSession } from 'next-auth/react';

const Header = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className='w-full h-16 fixed top-0 bg-white flex items-center px-3 justify-between shadow-sm z-50'>
        <div className='flex gap-2 items-center cursor-pointer' onClick={() => router.push('/')}>
          <Image src={logoIcon} alt='logo' className='w-10 h-10 sm:w-12 sm:h-12' />
          <p className='font-semibold text-sm sm:text-lg'>Digital Hanaro Tech</p>
        </div>

        <div className='flex gap-3 items-center' />
      </div>
    );
  }

  return (
    <div className='w-full h-16 fixed top-0 bg-white flex items-center px-3 justify-between shadow-sm z-50'>
      <div className='flex gap-2 items-center cursor-pointer' onClick={() => router.push('/')}>
        <Image src={logoIcon} alt='logo' className='w-10 h-10 sm:w-12 sm:h-12' />
        <p className='font-semibold text-sm sm:text-lg'>Digital Hanaro Tech</p>
      </div>

      <div className='flex gap-3 items-center'>
        {status === 'unauthenticated' && (
          <div className='flex gap-3'>
            <Button variant='login' onClick={() => router.push('/login')}>
              로그인
            </Button>
            <Button variant='signup' onClick={() => router.push('/signup')}>
              회원가입
            </Button>

            <Image src={searchIcon} alt='search' className='cursor-pointer w-4 h-4 sm:w-6 sm:h-6' />
          </div>
        )}

        {status === 'authenticated' && (
          <>
            {user?.role === 'ADMIN' && (
              <div
                className='flex gap-2 bg-gray-800 text-white items-center rounded-lg px-2 py-1.5 cursor-pointer'
                onClick={() => router.push('/write')}
              >
                <Image
                  src={editIcon}
                  alt='write'
                  className='cursor-pointer w-5 h-5 sm:w-5 sm:h-5'
                  onClick={() => router.push('/write')}
                />
                <p className='text-xs sm:text-sm text=gray-500'>포스트 작성</p>
              </div>
            )}
            <Image src={searchIcon} alt='search' className='cursor-pointer w-4 h-4 sm:w-6 sm:h-6' />
            <Image
              src={profileIcon}
              alt='profile'
              className='cursor-pointer w-5 h-5 sm:w-7 sm:h-7'
              onClick={() => router.push('/my-page')}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
