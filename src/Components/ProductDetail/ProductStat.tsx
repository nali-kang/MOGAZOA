import Image from 'next/image';

export default function ProductStat() {
  // console.log(data.categoryMetric);
  const maps = [1, 2, 3];
  return (
    <div className="mb-14 md:flex md:items-center md:justify-center">
      {maps.map((s) => (
        <div
          key={s}
          className=" w-[335px] h-[82px] md:w-[218px] md:h-[169px] xl:w-[300px] xl:h-[190px] xl:p-6 p-4 bg-scblack rounded-xl border border-zinc-700 flex-col gap-2.5 mx-auto mb-2 md:mx-3"
        >
          <div className="h-[42px] flex-col justify-start items-start gap-[5px] flex md:items-center md:gap-4">
            <div className="flex justify-center items-center gap-2.5 md:gap-4 md:flex-col">
              <div className="text-gray-100 text-sm font-medium font-['Pretendard'] md:text-base xl:text-lg">
                별점 평균
              </div>
              <div className="justify-start items-center gap-[5px] flex">
                <Image src="/icons/star-icon.svg" alt="별 아이콘" width={19} height={19} className="md:w-5 md:h-5" />
                <div className="text-gray-400 te xt-base font-light font-['Pretendard'] md:text-xl xl:text-2xl">
                  4.9
                </div>
              </div>
            </div>
            <div className="md:text-center md:w-[160px]">
              <span className="text-gray-500 text-xs font-light font-['Pretendard'] leading-[18px]">
                같은 카테고리의 제품들보다{' '}
              </span>
              <span className="text-gray-100 text-xs font-light font-['Pretendard'] leading-[18px]">0.8점</span>
              <span className="text-gray-500 text-xs font-light font-['Pretendard'] leading-[18px]"> 더 높아요!</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
