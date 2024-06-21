import { useContext } from 'react';
import { ModalSetterContext, ModalStateContext } from '@/Context/ModalContext';
import UserFollows from './UserFollows';
import { Follow } from '@/Types/UserProfile';

export default function FollowerModal() {
  const modalState = useContext(ModalStateContext);
  const setModalState = useContext(ModalSetterContext);

  function handleFollowerCloseOnClick() {
    setModalState({ isOpen: false, type: 'follower' });
  }
  return (
    <div className="w-[335px] h-[550px] md:w-[500px] md:h-[600px] desktop:w-[500px] desktop:h-[660px] relative pl-[20px] md:pl-[40px] pt-[40px] md:pt-[60px] pr-[18px] pb-[6px] md:pb-[16px] desktop-[17px] ">
      <button
        type="button"
        onClick={handleFollowerCloseOnClick}
        className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] desktop:w-[40px] desktop:h-[40px] absolute right-[15px] md:right-[20px] top-[15px] md:top-[20px] bg-center"
        aria-label="Close"
        style={{
          backgroundImage: 'url(/Icons/close-icon.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div>
        <h1 className="font-['Pretendard'] text-white text-[20px] desktop:text-[24px] font-semibold leading-[28px] desktop:leading-normal ">
          {modalState.nickName}님을 팔로우하는 유저
        </h1>
        <div className="flex flex-col gap-[20px] desktop:gap-[25px] mt-[20px] md:mt-[40px] ">
          {modalState.FollowersInfo?.data?.list.map((follower: Follow) => (
            <UserFollows key={follower.id} Followers={follower} />
          ))}
        </div>
      </div>
    </div>
  );
}
