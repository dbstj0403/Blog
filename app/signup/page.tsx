'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import logo from '@/assets/icons/logoIcon.png';
import Image from 'next/image';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (res.ok) {
      router.push('/login');
      return;
    }

    const body = await res.json();

    if (res.status === 409 && body.code === 'GITHUB_EXIST') {
      const proceed = window.confirm(body.message);
      if (proceed) {
        await signIn('github', {
          callbackUrl: '/dashboard',
          authorizationParams: { login: ' ' },
        });
      }
      setLoading(false);
      return;
    }

    setError(body.message || '알 수 없는 오류');
    setLoading(false);
  };

  return (
    <div className='max-w-md mx-auto space-y-6 p-6 pt-16 mt-10'>
      <div className='flex gap-2 items-center'>
        <Image src={logo} alt='logo' className='w-12 h-12' />
        <p className='font-semibold text-sm'>Digital Hanaro Tech</p>
      </div>
      <p className='text-2xl font-semibold text-gray-600 mb-4'>회원가입</p>
      {error && <p className='text-red-600 mb-4'>{error}</p>}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block mb-1 text-sm text-gray-500'>닉네임</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='w-full p-2 border rounded-lg'
          />
        </div>

        <div>
          <label className='block mb-1 text-sm text-gray-500'>이메일</label>
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
            minLength={8}
            className='w-full p-2 border rounded-lg'
          />
        </div>

        <div>
          <label className='block mb-1 text-sm text-gray-500'>비밀번호 확인</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className='w-full p-2 border rounded-lg'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 bg-hana-green text-white rounded-lg'
        >
          회원가입
        </button>

        <p className='text-gray-500 text-xs text-center'>
          이미 계정이 있으신가요? <span className='underline cursor-pointer'>로그인</span>
        </p>
      </form>
    </div>
  );
}
