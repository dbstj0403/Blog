'use client';

import Image from 'next/image';
import { useUser } from '@/app/context/UserContext';
import profileIcon from '@/assets/icons/profileIcon.svg';

const ProfileContent = () => {
  const { user } = useUser();
  return (
    <>
      <div className='pt-16 mt-10 px-4 sm:px-10 max-w-3xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <div className='w-20 h-20 rounded-full overflow-hidden border border-gray-300'>
            <Image
              src={user?.image || profileIcon}
              alt='user-profile'
              width={80}
              height={80}
              className='object-cover'
            />
          </div>
          <div>
            <p className='text-xl font-semibold'>{user?.name}</p>
            <p className='text-gray-600 text-sm'>{user?.email}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='border rounded-xl p-5 hover:shadow transition'>
            <p className='font-medium text-gray-800'>내가 작성한 글</p>
            <p className='text-sm text-gray-500 mt-1'>작성한 게시글을 확인할 수 있어요.</p>
          </div>

          <div className='border rounded-xl p-5 hover:shadow transition'>
            <p className='font-medium text-gray-800'>좋아요 누른 글</p>
            <p className='text-sm text-gray-500 mt-1'>관심 있는 게시글 목록이에요.</p>
          </div>

          <div className='border rounded-xl p-5 hover:shadow transition'>
            <p className='font-medium text-gray-800'>내 정보 수정</p>
            <p className='text-sm text-gray-500 mt-1'>
              프로필 이미지, 닉네임 등을 변경할 수 있어요.
            </p>
          </div>

          <div className='border rounded-xl p-5 hover:shadow transition'>
            <p className='font-medium text-gray-800'>로그아웃</p>
            <p className='text-sm text-gray-500 mt-1'>로그아웃하고 메인으로 돌아가요.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
