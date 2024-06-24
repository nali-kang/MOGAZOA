import { useGetUserInfo, useGetUserFollowees, useGetUserFollowers } from '@/Apis/User/useUserService';

import Button from '../../Button';
import { useContext } from 'react';
import { ModalSetterContext } from '@/Context/ModalContext';
import Link from 'next/link';

interface UserProfileCardProps {
  id: number;
}

function UserProfileCardLoggedOut({ id }: UserProfileCardProps) {
  const params = 0;
  const userId = id;
  const usersInfo = useGetUserInfo(userId);
  const FolloweesInfo = useGetUserFollowees(userId, params);
  const FollowersInfo = useGetUserFollowers(userId, params);
  const userInfo = usersInfo.data;
  const { image, nickname, description, followersCount, followeesCount } = userInfo;
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

  return (
    <article className="flex justify-center mx-[1.25rem] desktop:mx-[0] mt-[30px] md:mt-[40px] desktop:mt-[0] desktop:row-span-3">
      <div className="flex flex-col items-center gap-[1.875rem] desktop:gap-[2.5rem] px-[1.25rem] md:px-[1.875rem] desktop:px-[1.25rem] py-[1.875rem] desktop:pt-[2.5rem] desktop:pb-[1.875rem] w-[20.9375rem] md:w-[31.8125rem]  desktop:w-[21.25rem] desktop:h-[603px] bg-scblack border-black4 rounded-[0.75rem]">
        <div
          className="w-[7.5rem] h-[7.5rem] desktop:w-[180px] desktop:h-[180px] bg-center rounded-[60px] desktop:rounded-[120px] "
          style={{
            backgroundImage: image ? `url(${image})` : 'url(/images/basic-profileImg.svg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="flex flex-col items-center gap-[0.625rem] desktop:gap-[1.25rem]">
          <h1 className="font-['Pretendard'] text-white text-[1.25rem] desktop:text-[1.5rem] font-semibold leading-[1.75rem] desktop:leading-normal">
            {nickname}
          </h1>
          <p className="font-['Pretendard'] max-h-[40px] desktop:max-h-[45px] text-gray1 text-[0.875rem] desktop:text-[1rem] font-normal leading-[1.25rem] desktop:leading-[1.375rem] overflow-hidden">
            {description}
          </p>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center gap-[0.625rem] pr-[3.75rem] md:pr-[5rem] desktop:pr-[3.125rem] border-r border-black4">
            <button
              onClick={handleFollowerOnClick}
              className="font-['Pretendard'] text-white text-[1.125rem] desktop:text-[1.25rem] font-semibold bg-transparent border-none p-0 cursor-pointer"
              type="button"
            >
              {followersCount}
            </button>
            <p className="font-['Pretendard'] text-gray2 text-[0.875rem] desktop:text-[1rem] font-normal">팔로워</p>
          </div>
          <div className="flex flex-col items-center gap-[0.625rem] pl-[3.75rem] md:pl-[5rem] desktop:pl-[3.125rem]">
            <button
              onClick={handleFolloweeOnClick}
              className="font-['Pretendard'] text-white text-[1.125rem] desktop:text-[1.25rem] font-semibold bg-transparent border-none p-0 cursor-pointer"
              type="button"
            >
              {followeesCount}
            </button>
            <p className="font-['Pretendard'] text-gray2 text-[0.875rem] desktop:text-[1rem] font-normal">팔로잉</p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] md:gap-[15px] desktop:gap-[20px]">
          <Link href="/login">
            <Button
              className="w-[18.4375rem] h-[3.125rem] md:w-[28.0625rem] md:h-[3.4375rem] desktop:w-[18.75rem] desktop:h-[4.0625rem] font-['Pretendard'] text-md desktop-text-[1.125rem]"
              color="primary"
            >
              팔로우
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
export default UserProfileCardLoggedOut;
