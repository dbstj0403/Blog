'use client';

import { useEffect } from 'react';
import { useUser } from '@/app/context/UserContext';

export default function InitializeUser() {
  const { setUser } = useUser();

  useEffect(() => {
    // 사용자 정보 요청 (NextAuth 또는 직접 API 호출 방식 중 선택)
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) return;

        const data = await res.json();

        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.image,
          role: data.role, // 'ADMIN' 또는 'USER'
        });
      } catch (err) {
        console.error('유저 정보를 가져오는 중 오류 발생', err);
      }
    };

    fetchUser();
  }, [setUser]);

  return null;
}
