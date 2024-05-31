'use client';

import CategoryChip from '../../Chip/CategoryChip';

function UserActivityLogCard() {
  return (
    <article className="flex justify-center mx-[20px] lg:ml-[60px] ">
      <div className="flex flex-col mt-[60px] w-[335px] md:w-[509px] lg:w-[940px]">
        <h2 className="font-['Pretendard'] text-white text-[18px] lg:text-[20px] font-semibold mb-[30px] ">
          활동 내역
        </h2>
        <div className="flex gap-[10px] lg:gap-[20px]">
          <div className="flex flex-col justify-center items-center gap-[15px] px-[26.5px] py-[20px] lg:px-[96px] lg:py-[30px] w-[105px] h-[119px] lg:h-[128px] md:w-[163px] lg:w-[300px] rounded-[12px] bg-scblack  ">
            <p className="font-['Pretendard'] text-center text-gray2 text-[14px] lg:text-[16px] font-[500] leading-[20px] lg:leading-normal  ">
              <span className="block md:inline-block">남긴 </span>{' '}
              <span className="block md:inline-block whitespace-nowrap"> 별점 평균</span>
            </p>
            <div className="flex items-center gap-[5px]">
              <div
                className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] bg-cover bg-center"
                style={{ backgroundImage: 'url(/icons/star-icon.svg)' }}
              />
              <p className="font-['Pretendard'] text-white text-[20px] lg:text-[24px] font-[400] leading-nomal ">4.8</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[15px] px-[23.5px] py-[30px] lg:px-[115px] lg:py-[30px] w-[105px] h-[119px] md:w-[163px] lg:w-[300px] lg:h-[128px] rounded-[12px] bg-scblack ">
            <p className="font-['Pretendard'] text-center text-gray2 text-[14px] lg:text-[16px] font-[500] lg:font-[400] leading-[20px] lg:leading-normal whitespace-nowrap ">
              남긴 리뷰
            </p>
            <div className="flex items-center gap-[5px]">
              <div
                className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] bg-cover bg-center"
                style={{ backgroundImage: 'url(/icons/bubble-icon.svg)' }}
              />
              <p className="font-['Pretendard'] text-white text-[20px] lg:text-[24px] font-[400] leading-nomal ">125</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[15px] px-[23.5px] py-[21px] w-[105px] lg:px-[88px] lg:py-[30px] h-[119px] md:w-[163px] lg:w-[300px] lg:h-[128px] rounded-[12px] bg-scblack ">
            <p className="font-['Pretendard'] text-center text-gray2 text-[14px] lg:text-[16px] font-[500] lg:font-[400] leading-[20px] lg:leading-normal ">
              <span className="block md:inline-block">관심</span>{' '}
              <span className="block md:inline-block">카테고리</span>
            </p>
            <div>
              <CategoryChip category="의류/악세서리" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
export default UserActivityLogCard;
