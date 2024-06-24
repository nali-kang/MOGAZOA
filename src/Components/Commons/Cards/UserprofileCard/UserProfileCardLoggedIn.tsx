import { useGetUserMe, useGetUserInfo, useGetUserFollowees, useGetUserFollowers } from '@/Apis/User/useUserService';

import Button from '../../Button';
import { useContext, useEffect, useState } from 'react';
import { ModalSetterContext } from '@/Context/ModalContext';
import { useDeleteFollow, usePostFollow } from '@/Apis/Follow/useFollowService';
import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

interface UserProfileCardProps {
  id: number;
}

function UserProfileCardLoggedIn({ id }: UserProfileCardProps) {
  const userId = id;
  const cursor = 0;
  const payload = {
    userId: id,
  };
  const userMeInfo = useGetUserMe();
  const userMeId = userMeInfo.data.id;
  const usersInfo = useGetUserInfo(userId);
  const FolloweesInfo = useGetUserFollowees(userId, cursor);
  const FollowersInfo = useGetUserFollowers(userId, cursor);
  const isFolloweesInfo = useGetUserFollowees(userMeId, cursor);
  const isCurrentUser = userMeInfo.data?.id == userId;
  const userInfo = isCurrentUser ? userMeInfo.data : usersInfo.data;
  const isFolloweeUser = isFolloweesInfo.data?.list.some(
    (followee: { followee: { id: number } }) => followee.followee.id == userId
  );
  const { image, nickname, description, followersCount, followeesCount } = userInfo;
  const [isfollower, setIsFollower] = useState<boolean>(isFolloweeUser);
  const [Follower, setFollower] = useState<number>(followersCount);

  const [followerInfo, setFollowerInfo] = useState<any>(null);
  const [followeeInfo, setFolloweeInfo] = useState<any>(null);

  const setModalState = useContext(ModalSetterContext);
  const postFollow = usePostFollow(payload);
  const deleteFollow = useDeleteFollow(payload);
  const queryClient = useQueryClient();
  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;
  };
  const handleLogout = () => {
    deleteCookie('token');
    signOut({ callbackUrl: '/', redirect: true });
  };

  const handleDeleteFollow = () => {
    setIsFollower(false);
    deleteFollow.mutate(payload);
    setFollower((prev) => prev - 1);
  };

  const handlePostFollow = () => {
    setIsFollower(true);
    postFollow.mutate(payload);
    setFollower((prev) => prev + 1);
  };

  async function handleFolloweeOnClick() {
    await queryClient.invalidateQueries({
      queryKey: ['getUserFollowers', { userId, cursor }],
    });
    const updatedFolloweesInfo = queryClient.getQueryData(['getUserFollowees', { userId, cursor }]);
    setFollowerInfo(updatedFolloweesInfo);
    setModalState({
      isOpen: true,
      type: 'followee',
      FolloweesInfo: updatedFolloweesInfo,
      userId: userId,
      nickName: usersInfo.data.nickname,
    });
  }

  async function handleFollowerOnClick() {
    await queryClient.invalidateQueries({
      queryKey: ['getUserFollowers', { userId, cursor }],
    });

    const updatedFollowersInfo = queryClient.getQueryData(['getUserFollowers', { userId, cursor }]);
    setFollowerInfo(updatedFollowersInfo);
    setModalState({
      isOpen: true,
      type: 'follower',
      FollowersInfo: updatedFollowersInfo,
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
    <article className="flex justify-center mx-[1.25rem] desktop:mx-[0] mt-[30px] md:mt-[40px] desktop:mt-[0] desktop:row-span-3">
      <div
        className={
          isCurrentUser
            ? 'flex flex-col items-center gap-[1.875rem] desktop:gap-[2rem] px-[1.25rem] md:px-[1.875rem] desktop:px-[1.25rem] py-[1.875rem] desktop:pt-[2.5rem] desktop:pb-[1.875rem] w-[20.9375rem] md:w-[31.8125rem]  desktop:w-[21.25rem] desktop:h-[634px] bg-scblack border-black4 rounded-[0.75rem]'
            : 'flex flex-col items-center gap-[1.875rem] desktop:gap-[2.5rem] px-[1.25rem] md:px-[1.875rem] desktop:px-[1.25rem] py-[1.875rem] desktop:pt-[2.5rem] desktop:pb-[1.875rem] w-[20.9375rem] md:w-[31.8125rem]  desktop:w-[21.25rem] desktop:h-[603px] bg-scblack border-black4 rounded-[0.75rem]'
        }
      >
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
          <button
            onClick={handleFollowerOnClick}
            type="button"
            className="flex flex-col items-center gap-[0.625rem] pr-[3.75rem] md:pr-[5rem] desktop:pr-[3.125rem] border-r border-black4"
          >
            <div className="font-['Pretendard'] text-white text-[1.125rem] desktop:text-[1.25rem] font-semibold bg-transparent border-none p-0 cursor-pointer">
              {Follower}
            </div>
            <p className="font-['Pretendard'] text-gray2 text-[0.875rem] desktop:text-[1rem] font-normal">팔로워</p>
          </button>
          <button
            onClick={handleFolloweeOnClick}
            type="button"
            className="flex flex-col items-center gap-[0.625rem] pl-[3.75rem] md:pl-[5rem] desktop:pl-[3.125rem]"
          >
            <div className="font-['Pretendard'] text-white text-[1.125rem] desktop:text-[1.25rem] font-semibold bg-transparent border-none p-0 cursor-pointer">
              {followeesCount}
            </div>
            <p className="font-['Pretendard'] text-gray2 text-[0.875rem] desktop:text-[1rem] font-normal">팔로잉</p>
          </button>
        </div>
        <div className="flex flex-col gap-[10px] md:gap-[15px] desktop:gap-[20px]">
          {isCurrentUser ? (
            <>
              <Button
                onClick={handleProfileEditOnClick}
                className="w-[18.4375rem] h-[3.125rem] md:w-[28.0625rem] md:h-[3.4375rem] desktop:w-[18.75rem] desktop:h-[4.0625rem] font-['Pretendard'] text-md md:text-[1.125rem] leading-normal"
                color="primary"
              >
                프로필 편집
              </Button>
              <Button
                onClick={handleLogout}
                className="w-[18.4375rem] h-[3.125rem] md:w-[28.0625rem] md:h-[3.4375rem] desktop:w-[18.75rem] desktop:h-[4.0625rem] font-['Pretendard'] text-md md:text-[1.125rem] leading-normal"
                color="tertiary"
              >
                로그아웃
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-[10px] md:gap-[15px] desktop:gap-[20px]">
              {isfollower ? (
                <Button
                  onClick={handleDeleteFollow}
                  className="w-[18.4375rem] h-[3.125rem] md:w-[28.0625rem] md:h-[3.4375rem] desktop:w-[18.75rem] desktop:h-[4.0625rem] font-['Pretendard'] text-md desktop-text-[1.125rem]"
                  color="tertiary"
                >
                  팔로우 해제
                </Button>
              ) : (
                <Button
                  onClick={handlePostFollow}
                  className="w-[18.4375rem] h-[3.125rem] md:w-[28.0625rem] md:h-[3.4375rem] desktop:w-[18.75rem] desktop:h-[4.0625rem] font-['Pretendard'] text-md desktop-text-[1.125rem]"
                  color="primary"
                >
                  팔로우
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
export default UserProfileCardLoggedIn;
