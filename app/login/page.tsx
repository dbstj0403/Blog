'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import logo from '@/assets/icons/logoIcon.png';
import Image from 'next/image';

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCredentialsLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/',
    });

    if (res?.ok && res.url) {
      router.push(res.url);
    } else {
      setError('이메일 또는 비밀번호가 잘못되었습니다.');
      setLoading(false);
    }
  }

  return (
    <div className='max-w-md mx-auto p-6 space-y-6 pt-16 mt-10'>
      <div className='flex gap-2 items-center'>
        <Image src={logo} alt='logo' className='w-12 h-12' />
        <p className='font-semibold text-sm'>Digital Hanaro Tech</p>
      </div>
      <p className='text-2xl font-semibold text-gray-600'>로그인</p>

      <form onSubmit={handleCredentialsLogin} className='space-y-8'>
        <div>
          <label className='block mb-1 text-sm text-gray-500'>이메일 주소</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full p-2 border rounded-lg'
          />
        </div>

        <div>
          <label className='block mb-1 text-sm text-gray-500'>비밀번호</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full p-2 border rounded-lg'
          />
        </div>

        {error && <p className='text-red-600 text-xs'>{error}</p>}

        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 bg-hana-green text-white rounded-lg cursor-pointer'
        >
          로그인
        </button>
      </form>

      <hr />

      <button
        onClick={() =>
          signIn('github', {
            callbackUrl: `${window.location.origin}`,
          })
        }
        className='w-full py-3 bg-gray-800 text-white rounded-lg cursor-pointer'
      >
        Github 계정으로 로그인
      </button>
      <p
        className='text-sm text-gray-500 underline text-center cursor-pointer'
        onClick={() => router.push('/signup')}
      >
        회원가입
      </p>
    </div>
  );
}
