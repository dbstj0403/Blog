'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
    <div className='max-w-md mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>회원가입</h1>
      {error && <p className='text-red-600 mb-4'>{error}</p>}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block mb-1'>이름</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='w-full p-2 border rounded'
          />
        </div>

        <div>
          <label className='block mb-1'>이메일</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full p-2 border rounded'
          />
        </div>

        <div>
          <label className='block mb-1'>비밀번호</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className='w-full p-2 border rounded'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full py-2 bg-blue-600 text-white rounded'
        >
          {loading ? '가입 중…' : '회원가입'}
        </button>
      </form>
    </div>
  );
}
