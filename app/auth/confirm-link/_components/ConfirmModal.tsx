'use client';

import { useState } from 'react';
import Modal from '../../../../components/common/Modal';

interface ConfirmLinkModalProps {
  isOpen: boolean;
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmLinkModal({
  isOpen,
  email,
  onConfirm,
  onCancel,
}: ConfirmLinkModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      actions={[
        {
          label: '아니오',
          onClick: onCancel,
          className: 'bg-gray-300 text-gray-800 hover:bg-gray-300/90',
        },
        {
          label: '예, 연결하기',
          onClick: onConfirm,
          className: 'bg-hana-green text-white hover:bg-hana-green/90',
        },
      ]}
    >
      <h2 className='text-lg font-semibold mb-4'>계정 연결 확인</h2>
      <p>
        이메일 주소 <span className='font-medium'>{email}</span> 로 이미 가입된 계정이 있습니다.
      </p>
      <p className='mt-2'>
        이 GitHub 계정을 연결하면, 다음부터는 GitHub 로그인으로도 동일한 계정에 접근할 수 있습니다.
      </p>
    </Modal>
  );
}
