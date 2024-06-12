import { useGetUserMe, useGetUserInfo, useGetUserFollowees, useGetUserFollowers } from '@/Apis/User/useUserService';

import Button from '../../Button';
import { useContext } from 'react';
import { ModalSetterContext } from '@/Context/ModalContext';

function UserProfileCard() {
  const params = {};
  const userId = 1;
  // const userMeInfo = useGetUserMe(params);
  const usersInfo = useGetUserInfo(userId, params);
  const FolloweesInfo = useGetUserFollowees(userId, params);
  const FollowersInfo = useGetUserFollowers(userId, params);

  const setModalState = useContext(ModalSetterContext);
  function handleFolloweeOnClick() {
    setModalState({
      isOpen: true,
      type: 'followee',
      FolloweesInfo: FolloweesInfo,
      userId: userId,
      nickName: usersInfo.data.nickname,
    });
  }
  function handleFollowerOnClick() {
    setModalState({
      isOpen: true,
      type: 'follower',
      FollowersInfo: FollowersInfo,
      userId: userId,
      nickName: usersInfo.data.nickname,
    });
  }
  function handleProfileEditOnClick() {
    setModalState({
      isOpen: true,
      type: 'profileEdit',
      userId: userId,
    });
  }
  return (
    <article className="flex justify-center mx-[1.25rem] xl:mx-[0] mt-[30px] md:mt-[40px] xl:mt-[0] xl:row-span-3">
      <div className="flex flex-col items-center gap-[1.875rem] xl:gap-[2.5rem] px-[1.25rem] md:px-[1.875rem] xl:px-[1.25rem] py-[1.875rem] xl:pt-[2.5rem] xl:pb-[1.875rem] w-[20.9375rem] md:w-[31.8125rem]  xl:w-[21.25rem] xl:h-[603px] bg-scblack border-black4 rounded-[0.75rem]">
        <div
          className="w-[7.5rem] h-[7.5rem] xl:w-[11.25rem] xl:h-[11.25rem] bg-center"
          style={{
            backgroundImage: usersInfo.data.image ? `url(${usersInfo.data.image})` : 'url(/images/img-profile1.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="flex flex-col items-center gap-[0.625rem] xl:gap-[1.25rem]">
          <h1 className="font-['Pretendard'] text-white text-[1.25rem] xl:text-[1.5rem] font-semibold leading-[1.75rem] xl:leading-normal">
            {usersInfo.data.nickname}
          </h1>
          <p className="font-['Pretendard'] text-gray1 text-[0.875rem] xl:text-[1rem] font-normal leading-[1.25rem] xl:leading-[1.375rem]">
            {usersInfo.data.description}
          </p>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center gap-[0.625rem] pr-[3.75rem] md:pr-[5rem] xl:pr-[3.125rem] border-r border-black4">
            <button
              onClick={handleFollowerOnClick}
              className="font-['Pretendard'] text-white text-[1.125rem] xl:text-[1.25rem] font-semibold bg-transparent border-none p-0 cursor-pointer"
              type="button"
            >
              {usersInfo.data.followersCount}
            </button>
            <p className="font-['Pretendard'] text-gray2 text-[0.875rem] xl:text-[1rem] font-normal">팔로워</p>
          </div>
          <div className="flex flex-col items-center gap-[0.625rem] pl-[3.75rem] md:pl-[5rem] xl:pl-[3.125rem]">
            <button
              onClick={handleFolloweeOnClick}
              className="font-['Pretendard'] text-white text-[1.125rem] xl:text-[1.25rem] font-semibold bg-transparent border-none p-0 cursor-pointer"
              type="button"
            >
              {usersInfo.data.followeesCount}
            </button>
            <p className="font-['Pretendard'] text-gray2 text-[0.875rem] xl:text-[1rem] font-normal">팔로잉</p>
          </div>
        </div>
        <Button
          onClick={handleProfileEditOnClick}
          className="w-[18.4375rem] h-[3.125rem] md:w-[28.0625rem] md:h-[3.4375rem] xl:w-[18.75rem] xl:h-[4.0625rem] font-['Pretendard'] text-md xl-text-[1.125rem]"
          color="tertiary"
        >
          팔로우
        </Button>
      </div>
    </article>
  );
}
export default UserProfileCard;
