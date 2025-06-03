import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export const useAccountLink = () => {
  const router = useRouter();
  const params = useSearchParams();

  const userId = params.get('userId') ?? '';
  const providerId = params.get('providerId') ?? '';
  const providerAccountId = params.get('providerAccountId') ?? '';
  const email = params.get('email') ?? '';

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return {
    open,
    loading,
    error,
    email,
    onConfirm,
    onCancel,
  };
};
