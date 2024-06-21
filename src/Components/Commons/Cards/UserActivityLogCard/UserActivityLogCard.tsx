'use client';

import { useGetUserInfo } from '@/Apis/User/useUserService';
import CategoryChip from '../../Chip/CategoryChip';

interface UserActivityLogCardProps {
  id: number;
}

function UserActivityLogCard({ id }: UserActivityLogCardProps) {
  const userId = id;
  const usersInfo = useGetUserInfo(userId);
  return (
    <div className="flex justify-center mx-[1.25rem] desktop:ml-[3.75rem] desktop:mx-[0]">
      <div className="flex flex-col mt-[3.75rem] desktop:mt-[0] w-[20.9375rem] md:w-[31.8125rem] desktop:w-[58.75rem] ">
        <h2 className="font-['Pretendard'] text-white text-[1.125rem] desktop:text-[1.25rem] font-semibold mb-[1.875rem]">
          활동 내역
        </h2>
        <div className="flex gap-[0.625rem] desktop:gap-[1.25rem]">
          <div className="flex flex-col justify-center items-center gap-[0.9375rem] px-[1.65625rem] py-[1.25rem] desktop:px-[6rem] desktop:py-[1.875rem] w-[6.5625rem] h-[7.4375rem] desktop:h-[8rem] md:w-[10.1875rem] desktop:w-[18.75rem] rounded-[0.75rem] bg-scblack">
            <p className="font-['Pretendard'] text-center text-gray2 text-[0.875rem] desktop:text-[1rem] font-[500] leading-[1.25rem] desktop:leading-normal">
              <span className="block md:inline-block">남긴 </span>
              <span className="block md:inline-block whitespace-nowrap"> 별점 평균</span>
            </p>
            <div className="flex items-center gap-[0.3125rem]">
              <div
                className="w-[1.25rem] h-[1.25rem] desktop:w-[1.5rem] desktop:h-[1.5rem] bg-cover bg-center"
                style={{ backgroundImage: 'url(/Icons/star-icon.svg)' }}
              />
              <p className="font-['Pretendard'] text-white text-[1.25rem] desktop:text-[1.5rem] font-[400] leading-nomal">
                {Math.round(usersInfo.data.averageRating * 10) / 10}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[0.9375rem] px-[1.46875rem] py-[1.875rem] desktop:px-[7.1875rem] desktop:py-[1.875rem] w-[6.5625rem] h-[7.4375rem] md:w-[10.1875rem] desktop:w-[18.75rem] desktop:h-[8rem] rounded-[0.75rem] bg-scblack">
            <p className="font-['Pretendard'] text-center text-gray2 text-[0.875rem] desktop:text-[1rem] font-[500] desktop:font-[400] leading-[1.25rem] desktop:leading-normal whitespace-nowrap">
              남긴 리뷰
            </p>
            <div className="flex items-center gap-[0.3125rem]">
              <div
                className="w-[1.25rem] h-[1.25rem] desktop:w-[1.5rem] desktop:h-[1.5rem] bg-cover bg-center"
                style={{ backgroundImage: 'url(/Icons/bubble-icon.svg)' }}
              />
              <p className="font-['Pretendard'] text-white text-[1.25rem] desktop:text-[1.5rem] font-[400] leading-nomal">
                {usersInfo.data.reviewCount}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[0.9375rem] px-[0.5rem] py-[1.3125rem] w-[6.5625rem] desktop:px-[5rem] desktop:py-[1.875rem] h-[7.4375rem] md:w-[10.1875rem] desktop:w-[18.75rem] desktop:h-[8rem] rounded-[0.75rem] bg-scblack">
            <p className="font-['Pretendard'] text-center text-gray2 text-[0.875rem] desktop:text-[1rem] font-[500] desktop:font-[400] leading-[1.25rem] desktop:leading-normal">
              <span className="block md:inline-block">관심</span>
              <span className="block md:inline-block">카테고리</span>
            </p>
            <div>
              {usersInfo.data.mostFavoriteCategory ? (
                <CategoryChip category={usersInfo.data.mostFavoriteCategory.name} />
              ) : (
                <div className="text-white desktop:text-[20px]">없음</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserActivityLogCard;
