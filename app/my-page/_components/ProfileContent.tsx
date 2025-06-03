'use client';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import profileIcon from '@/assets/icons/profileIcon.svg';
import Modal from '@/components/common/Modal';
import EditProfileModal from './EditProfileModal';

const ProfileContent = ({ user }: { user: any }) => {
  const router = useRouter();

  const { update, data: session } = useSession();
  const [userName, setUserName] = useState(user?.name ?? '');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    signOut({ callbackUrl: '/' });
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);

    const res = await fetch('/api/users/delete', {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('탈퇴가 완료되었습니다.');
      signOut({ callbackUrl: '/' });
    } else {
      alert('탈퇴 중 오류가 발생했습니다.');
    }
  };

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
            <p className='text-xl font-semibold'>{userName}</p>
            <p className='text-gray-600 text-sm'>{user?.email}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='border rounded-xl p-5 hover:shadow transition cursor-pointer'>
            <p className='font-medium text-gray-800'>좋아요 누른 글</p>
            <p className='text-sm text-gray-500 mt-1'>관심 있는 포스트 목록이에요.</p>
          </div>

          <div
            className='border rounded-xl p-5 hover:shadow transition cursor-pointer'
            onClick={() => setShowEditModal(true)}
          >
            <p className='font-medium text-gray-800'>내 정보 수정</p>
            <p className='text-sm text-gray-500 mt-1'>프로필 닉네임을 변경할 수 있어요.</p>
          </div>

          <EditProfileModal
            currentName={user.name || ''}
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSuccess={async (newName: string) => {
              setUserName(newName);
              setShowEditModal(false);
              await update();
              window.location.reload();
            }}
          />

          <div
            onClick={handleLogout}
            className='border rounded-xl p-5 hover:shadow transition cursor-pointer'
          >
            <p className='font-medium text-gray-800'>로그아웃</p>
            <p className='text-sm text-gray-500 mt-1'>로그아웃하고 메인으로 돌아가요.</p>
          </div>

          <div
            onClick={handleDeleteAccount}
            className='border rounded-xl p-5 hover:shadow transition cursor-pointer'
          >
            <p className='font-medium text-red-600'>회원 탈퇴</p>
            <p className='text-sm text-red-500 mt-1'>계정을 완전히 삭제합니다. 되돌릴 수 없어요.</p>
          </div>

          {session?.user.role === 'ADMIN' && (
            <div
              onClick={() => router.push('/admin')}
              className='border rounded-xl p-5 hover:shadow transition cursor-pointer'
            >
              <p className='font-medium text-gray-800'>관리자 페이지</p>
              <p className='text-sm text-gray-500 mt-1'>서비스 관리 페이지로 이동합니다.</p>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        actions={[
          {
            label: '로그아웃',
            onClick: confirmLogout,
            className: 'bg-hana-green text-white hover:bg-hana-green/90',
          },
          {
            label: '취소',
            onClick: () => setShowLogoutModal(false),
            className: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
          },
        ]}
      >
        로그아웃 하시겠습니까?
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        actions={[
          {
            label: '탈퇴하기',
            onClick: confirmDelete,
            className: 'bg-red-600 text-white hover:bg-red-700',
          },
          {
            label: '취소',
            onClick: () => setShowDeleteModal(false),
            className: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
          },
        ]}
      >
        정말 탈퇴하시겠습니까? 탈퇴 시 모든 정보가 삭제됩니다.
      </Modal>
    </>
  );
};

export default ProfileContent;
