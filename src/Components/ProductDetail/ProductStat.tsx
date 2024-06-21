import Image from 'next/image';

export default function ProductStat({ data }: any) {
  // console.log(data);

  const categoryMetric = [
    // TODO: 객체로 바꿔서 마법수 없애기
    [data.categoryMetric.rating, '별점 평균', '/Icons/star-icon.svg', data.rating, '점 ', '더 높아요!'],
    [data.categoryMetric.favoriteCount, '찜', '/Icons/save-icon.svg', data.favoriteCount, '개 ', '더 많아요!'],
    [data.categoryMetric.reviewCount, '리뷰', '/Icons/bubble-icon.svg', data.reviewCount, '개 ', '더 많아요!'],
  ];
  return (
    <div className="mb-14 md:flex md:items-center md:justify-center">
      {categoryMetric.map((item) => (
        <div
          key={item[1]}
          className=" w-[335px] h-[82px] md:w-[218px] md:h-[169px] xl:w-[300px] xl:h-[190px] xl:p-6 p-4 bg-scblack rounded-xl border border-zinc-700 flex-col gap-2.5 mx-auto mb-2 md:mx-3"
        >
          <div className="h-[42px] flex-col justify-start items-start gap-[5px] flex md:items-center md:gap-4">
            <div className="flex justify-center items-center gap-2.5 md:gap-4 md:flex-col">
              <div className="text-gray-100 text-sm font-medium font-['Pretendard'] md:text-base xl:text-lg">
                {item[1]}
              </div>
              <div className="justify-start items-center gap-[5px] flex">
                <Image src={item[2]} alt="별 아이콘" width={19} height={19} className="md:w-5 md:h-5" />
                <div className="text-gray-400 te xt-base font-light font-['Pretendard'] md:text-xl xl:text-2xl">
                  {item[1] === '별점 평균' ? item[0].toFixed(1) : Math.round(item[0])}
                </div>
              </div>
            </div>
            <div className="md:text-center md:w-[160px]">
              <span className="text-gray-500 text-xs font-light font-['Pretendard'] leading-[18px]">
                같은 카테고리의 제품들보다{' '}
              </span>
              <span className="text-gray-100 text-xs font-light font-['Pretendard'] leading-[18px]">
                {item[1] === '별점 평균' ? (item[3] - item[0]).toFixed(1) : Math.round(item[3] - item[0])}
                {item[4]}
              </span>
              <span className="text-gray-500 text-xs font-light font-['Pretendard'] leading-[18px]">
                {Math.round(item[3] - item[0]) < 0 ? '더 낮아요' : item[5]}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
