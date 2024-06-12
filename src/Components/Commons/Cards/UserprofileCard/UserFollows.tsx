'use client';

import { UserFollowee, UserFollower } from '@/Types/UserProfile';

interface UserFollowProps {
  Followees: UserFollowee | undefined;
  Followers: UserFollower | undefined;
}

function UserFollows({ Followees, Followers }: UserFollowProps) {
  const followeeData = Followees?.followee;
  const followerData = Followers?.follower;

  const { image, nickname } = followeeData || followerData;

  return (
    <div className="flex gap-[20px] items-center">
      <div
        className="w-[48px] h-[48px] xl:w-[52px] xl:h-[52px] bg-center rounded-[30px]"
        style={{
          backgroundImage: image ? `url(${image})` : 'url(/images/img-profile1.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <p className="font-['Pretendard'] text-white text-[16px] xl:text-[18px] font-[500] leading-normal">{nickname}</p>
    </div>
  );
}
export default UserFollows;
