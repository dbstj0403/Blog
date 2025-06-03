'use client';

export default function NotFound() {
  return (
    <>
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6'>
        <h1 className='text-5xl font-bold mb-4'>404 | 페이지를 찾을 수 없습니다</h1>
        <p className='mb-6 text-lg'>요청하신 페이지가 존재하지 않거나 삭제되었어요.</p>
        <button
          onClick={() => (location.href = '/')}
          className='px-4 py-2 bg-hana-green text-white rounded-md shadow hover:bg-hana-green-80 cursor-pointer'
        >
          홈으로 돌아가기
        </button>
      </div>
    </>
  );
}
