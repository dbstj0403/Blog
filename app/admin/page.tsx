'use client';

import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '@/components/common/Modal'; // 경로 맞게 수정

export default function AdminPage() {
  const { user } = useUser();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  // 권한 확인
  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      setShowModal(true);
    }
  }, [user]);

  const handleRedirect = () => {
    setShowModal(false);
    router.replace('/');
  };

  // 유저 정보가 아직 초기화되지 않은 경우
  if (user === null) return <p>로딩 중...</p>;

  // ✅ 관리자일 경우 본문 노출
  return (
    <>
      {user.role === 'ADMIN' && (
        <div className='pt-16 mt-10 mx-auto flex flex-col items-center'>
          <h1 className='text-xl font-bold'>관리자 전용 페이지</h1>
          <p>환영합니다, {user.name}님!</p>
        </div>
      )}

      {/* 관리자 외 사용자일 경우 모달 노출 */}
      <Modal
        isOpen={showModal}
        onClose={handleRedirect}
        actions={[
          {
            label: '확인',
            onClick: handleRedirect,
          },
        ]}
      >
        관리자만 접근할 수 있는 페이지입니다.
      </Modal>
    </>
  );
}
