'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/common/Modal';

interface EditProfileModalProps {
  currentName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newName: string) => void;
}

export default function EditProfileModal({
  currentName,
  isOpen,
  onClose,
  onSuccess,
}: EditProfileModalProps) {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const updateUserName = async (newName: string) => {
    const res = await fetch('/api/users/update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || '수정에 실패했습니다.');
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      await updateUserName(name);
      alert('닉네임이 수정되었습니다.');
      onSuccess(name);
      onClose();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        actions={[
          {
            label: loading ? '저장 중...' : '저장',
            onClick: handleSave,
            className: 'bg-hana-green text-white hover:bg-hana-green/90',
          },
          {
            label: '취소',
            onClick: onClose,
            className: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
          },
        ]}
      >
        <div className='flex flex-col gap-3 text-sm'>
          <label className='text-gray-700'>닉네임</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border p-2 rounded'
            placeholder='새 닉네임을 입력하세요'
          />
        </div>
      </Modal>
    </>
  );
}
