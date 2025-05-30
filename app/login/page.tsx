'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button className="px-4 py-2 bg-black text-white rounded" onClick={() => signIn('github')}>
        Sign in with GitHub
      </button>
    </div>
  );
}
