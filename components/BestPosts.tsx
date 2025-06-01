const BestPosts = () => {
  return (
    <>
      <div className='flex flex-col mt-5 sm:mt-0 sm:px-5 w-full sm:border-l-[1px] sm:border-gray-300 sm:min-h-screen sm:mx-5 sm:border-t-0 border-t-[1px] border-gray-300'>
        <p className='text-sm text-gray-500 mb-5 mt-5 sm:mt-0'>인기있는 글</p>

        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-3'>
            <p className='text-medium font-semibold'>코드 리뷰할 시간이 어딨어요? 모닥불</p>
            <p className='text-sm text-gray-500'>토스 프론트엔드 챕터</p>
          </div>

          <div className='flex flex-col gap-3'>
            <p className='text-medium font-semibold'>코드 리뷰할 시간이 어딨어요? 모닥불</p>
            <p className='text-sm text-gray-500'>토스 프론트엔드 챕터</p>
          </div>

          <div className='flex flex-col gap-3'>
            <p className='text-medium font-semibold'>코드 리뷰할 시간이 어딨어요? 모닥불</p>
            <p className='text-sm text-gray-500'>토스 프론트엔드 챕터</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestPosts;
