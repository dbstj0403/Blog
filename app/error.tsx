'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[App Error]', error);
  }, [error]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-6'>
      <h1 className='text-4xl font-bold mb-4'>오류가 발생했습니다</h1>
      <p className='text-lg mb-6'>죄송합니다. 예기치 못한 문제가 발생했어요. 🥲</p>
      <button
        onClick={() => reset()}
        className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer'
      >
        다시 시도하기
      </button>
    </div>
  );
}
