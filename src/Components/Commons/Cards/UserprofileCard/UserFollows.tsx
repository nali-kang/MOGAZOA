import { ModalSetterContext } from '@/Context/ModalContext';
import { UserFollowee, UserFollower } from '@/Types/UserProfile';
import Link from 'next/link';
import { useContext } from 'react';

interface UserFollowProps {
  Followees: UserFollowee | undefined;
  Followers: UserFollower | undefined;
}

function UserFollows({ Followees, Followers }: UserFollowProps) {
  const setModalState = useContext(ModalSetterContext);

  const followeeData = Followees?.followee;
  const followerData = Followers?.follower;

  const { id, image, nickname } = followeeData || followerData;
  function handleFolloweeCloseOnClick() {
    setModalState({ isOpen: false, type: 'followee' });
  }
  return (
    <Link href={`/userprofile/${id}`}>
      <div onClick={handleFolloweeCloseOnClick} className="flex gap-[20px] items-center">
        <div
          className="w-[48px] h-[48px] desktop:w-[52px] desktop:h-[52px] bg-center rounded-[30px]"
          style={{
            backgroundImage: image ? `url(${image})` : 'url(/images/basic-profileImg.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <p className="font-['Pretendard'] text-white text-[16px] desktop:text-[18px] font-[500] leading-normal">
          {nickname}
        </p>
      </div>
    </Link>
  );
}
export default UserFollows;
