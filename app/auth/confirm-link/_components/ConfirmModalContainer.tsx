'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import ConfirmLinkModal from './ConfirmModal';

const ConfirmModalContainer = () => {
  const params = useSearchParams();
  const router = useRouter();

  const userId = params.get('userId') ?? '';
  const providerId = params.get('providerId') ?? '';
  const providerAccountId = params.get('providerAccountId') ?? '';
  const email = params.get('email') ?? '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!userId || !providerId || !providerAccountId) {
      router.replace('/login');
    } else {
      setOpen(true);
    }
  }, [userId, providerId, providerAccountId, router]);

  const onConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, providerId, providerAccountId }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || '알 수 없는 오류');
      }
      await signIn('github', { callbackUrl: '/' });
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  const onCancel = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/unlink-temp-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, providerAccountId }),
      });
    } finally {
      router.replace('/login');
    }
  };

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
