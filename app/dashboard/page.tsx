'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (!data?.user) {
          router.replace('/login');
        } else {
          setSession(data);
        }
      });
  }, [router]);

  const handleDeleteAccount = async () => {
    const ok = confirm('정말 탈퇴하시겠습니까?');
    if (!ok) return;

    const res = await fetch('/api/user/delete', {
      method: 'DELETE',
    });

    if (res.ok) {
      await signOut({ redirect: true, callbackUrl: '/' });
    } else {
      alert('탈퇴에 실패했습니다.');
    }
  };

  if (!session) return null;

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>환영합니다, {session.user.email}님!</h1>

      <div className='space-x-4'>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className='px-4 py-2 bg-gray-600 text-white rounded'
        >
          로그아웃
        </button>

        <button onClick={handleDeleteAccount} className='px-4 py-2 bg-red-600 text-white rounded'>
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}
