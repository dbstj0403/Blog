// app/login/page.tsx
'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // 이미 로그인된 상태면 바로 /dashboard 로
  useEffect(() => {
    if (session) router.replace('/dashboard');
  }, [session, router]);

  return (
    <button
      onClick={() =>
        signIn('github', {
          callbackUrl: '/dashboard', // ← 로그인 성공 후 이 경로로
        })
      }
    >
      Sign in with GitHub
    </button>
  );
}
