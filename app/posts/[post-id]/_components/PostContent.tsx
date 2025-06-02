const PostContent = () => {
  return (
    <div className='pt-16 mt-10 flex justify-center px-4 pb-15'>
      <div className='max-w-3xl w-full flex flex-col gap-5'>
        <div>
          <p className='font-bold text-3xl'>토스는 어떻게 광고를 보여줄까? 토스애즈 ML 톺아보기</p>
        </div>

        <div className='flex gap-2 justify-start'>
          <p className='rounded-full text-sm bg-gray-200 py-2 text-gray-600 px-3'># React</p>
        </div>

        <div className='flex flex-col gap-2 pl-2 mb-10'>
          <p className='text-gray-700'>김영호</p>
          <p className='text-gray-500 text-xs sm:text-sm'>2024년 4월 23일</p>
        </div>

        <div>
          <p>
            안녕하세요, 토스 Ads Performance 팀 ML Engineer 김영호입니다. 토스앱 진입 시 확인하실 수
            있는 다양한 광고들은 어떤 과정을 거쳐 유저에게 노출될까요? 이 글에서는 토스 광고 추천
            시스템의 전체 흐름과 그 안의 머신러닝 활용 방식을 소개해 드리겠습니다. 웹사이트나 앱에서
            볼 수 있는 대부분의 광고는 실시간 입찰 방식을 통해 노출됩니다. 매체에서 광고 지면에 노출
            기회가 발생하면 해당 정보를 광고주에게 전달하고, 광고주는 기회에 대한 가치를 평가해
            자신이 지불할 금액을 산정하여 입찰에 참여하죠. 제출된 입찰가 중 가장 높은 금액을 제시한
            광고주의 광고가 최종적으로 해당 지면에 노출됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
