'use client';

import { useGetUserMe, useGetUserInfo } from '@/Apis/User/useUserService';
import CategoryChip from '../../Chip/CategoryChip';

function UserActivityLogCard() {
  const params = {};
  const userId = 1;
  const usersInfo = useGetUserInfo(userId, params);
  return (
    <div className="flex justify-center mx-[1.25rem] xl:ml-[3.75rem] xl:mx-[0]">
      <div className="flex flex-col mt-[3.75rem] xl:mt-[0] w-[20.9375rem] md:w-[31.8125rem] xl:w-[58.75rem] ">
        <h2 className="font-['Pretendard'] text-white text-[1.125rem] xl:text-[1.25rem] font-semibold mb-[1.875rem]">
          활동 내역
        </h2>
        <div className="flex gap-[0.625rem] xl:gap-[1.25rem]">
          <div className="flex flex-col justify-center items-center gap-[0.9375rem] px-[1.65625rem] py-[1.25rem] xl:px-[6rem] xl:py-[1.875rem] w-[6.5625rem] h-[7.4375rem] xl:h-[8rem] md:w-[10.1875rem] xl:w-[18.75rem] rounded-[0.75rem] bg-scblack">
            <p className="font-['Pretendard'] text-center text-gray2 text-[0.875rem] xl:text-[1rem] font-[500] leading-[1.25rem] xl:leading-normal">
              <span className="block md:inline-block">남긴 </span>
              <span className="block md:inline-block whitespace-nowrap"> 별점 평균</span>
            </p>
            <div className="flex items-center gap-[0.3125rem]">
              <div
                className="w-[1.25rem] h-[1.25rem] xl:w-[1.5rem] xl:h-[1.5rem] bg-cover bg-center"
                style={{ backgroundImage: 'url(/icons/star-icon.svg)' }}
              />
              <p className="font-['Pretendard'] text-white text-[1.25rem] xl:text-[1.5rem] font-[400] leading-nomal">
                {usersInfo.data.averageRating}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[0.9375rem] px-[1.46875rem] py-[1.875rem] xl:px-[7.1875rem] xl:py-[1.875rem] w-[6.5625rem] h-[7.4375rem] md:w-[10.1875rem] xl:w-[18.75rem] xl:h-[8rem] rounded-[0.75rem] bg-scblack">
            <p className="font-['Pretendard'] text-center text-gray2 text-[0.875rem] xl:text-[1rem] font-[500] xl:font-[400] leading-[1.25rem] xl:leading-normal whitespace-nowrap">
              남긴 리뷰
            </p>
            <div className="flex items-center gap-[0.3125rem]">
              <div
                className="w-[1.25rem] h-[1.25rem] xl:w-[1.5rem] xl:h-[1.5rem] bg-cover bg-center"
                style={{ backgroundImage: 'url(/icons/bubble-icon.svg)' }}
              />
              <p className="font-['Pretendard'] text-white text-[1.25rem] xl:text-[1.5rem] font-[400] leading-nomal">
                {usersInfo.data.reviewCount}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[0.9375rem] px-[0.5rem] py-[1.3125rem] w-[6.5625rem] xl:px-[5rem] xl:py-[1.875rem] h-[7.4375rem] md:w-[10.1875rem] xl:w-[18.75rem] xl:h-[8rem] rounded-[0.75rem] bg-scblack">
            <p className="font-['Pretendard'] text-center text-gray2 text-[0.875rem] xl:text-[1rem] font-[500] xl:font-[400] leading-[1.25rem] xl:leading-normal">
              <span className="block md:inline-block">관심</span>
              <span className="block md:inline-block">카테고리</span>
            </p>
            <div>
              <CategoryChip category={usersInfo.data.mostFavoriteCategory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserActivityLogCard;
