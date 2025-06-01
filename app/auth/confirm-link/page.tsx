// app/auth/confirm-link/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';

export default function ConfirmLinkPage() {
  const params = useSearchParams();
  const router = useRouter();

  const userId = params.get('userId') ?? '';
  const providerId = params.get('providerId') ?? '';
  const providerAccountId = params.get('providerAccountId') ?? '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 만약 쿼리 파라미터가 없다면 로그인 페이지로 리디렉트
  useEffect(() => {
    if (!userId || !providerId || !providerAccountId) {
      router.replace('/login');
    }
  }, [userId, providerId, providerAccountId, router]);

  async function handleLink() {
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
      // ── 여기를 이렇게 바꿔주세요 ──
      // 계정이 연결되었으니, GitHub OAuth 로그인 플로우를 재시작합니다.
      // callbackUrl을 /dashboard로 지정하면,
      // 바로 대시보드 세션이 발급된 뒤 이동합니다.
      await signIn('github', { callbackUrl: '/dashboard' });
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  // handleCancel 함수
  async function handleCancel() {
    setLoading(true);
    setError(null);
    try {
      await fetch('/api/auth/unlink-temp-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, providerAccountId }),
      });
    } catch (e) {
      // 실패해도 무시
    }
    router.replace('/login');
  }

  return (
    <div className='max-w-md mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>이미 로컬 계정이 있습니다</h1>
      <p className='mb-6'>
        이 이메일로 이미 가입된 로컬 계정이 있어요.
        <br />
        GitHub 계정을 이 로컬 계정에 연결하시겠습니까?
      </p>

      {error && <p className='text-red-600 mb-4'>{error}</p>}

      <div className='flex space-x-2'>
        <button
          className='px-4 py-2 bg-green-600 text-white rounded'
          onClick={handleLink}
          disabled={loading}
        >
          {loading ? '연결 중…' : '네, 연결할게요'}
        </button>
        <button
          className='px-4 py-2 bg-gray-300 rounded'
          onClick={() => router.push('/login')}
          disabled={loading}
        >
          아니요, 취소
        </button>
      </div>
    </div>
  );
}
