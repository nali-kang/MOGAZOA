import { ModalSetterContext } from '@/Context/ModalContext';
import { FollowProps } from '@/Types/UserProfile';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useContext } from 'react';

interface UserFollowProps {
  Followees?: FollowProps;
  Followers?: FollowProps;
}

function UserFollows({ Followees, Followers }: UserFollowProps) {
  const setModalState = useContext(ModalSetterContext);

  const { id, image, nickname } = Followees
    ? Followees?.followee ?? { id: '', image: '', nickname: '' }
    : Followers?.follower ?? { id: '', image: '', nickname: '' };

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
            backgroundSize: 'cover',
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
