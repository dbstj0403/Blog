'use client';

import { useAccountLink } from '@/hooks/auth/useAccountLink';
import ConfirmLinkModal from './ConfirmModal';

const ConfirmModalContainer = () => {
  const { open, email, error, onConfirm, onCancel } = useAccountLink();

  return (
    <>
      <ConfirmLinkModal isOpen={open} email={email} onConfirm={onConfirm} onCancel={onCancel} />

      <div className='fixed inset-0 bg-white' />

      {error && (
        <div className='fixed bottom-4 left-1/2 -translate-x-1/2 text-sm text-red-600'>{error}</div>
      )}
    </>
  );
};

export default ConfirmModalContainer;
