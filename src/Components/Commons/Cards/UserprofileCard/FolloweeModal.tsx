import { useContext } from 'react';
import { ModalSetterContext, ModalStateContext } from '@/Context/ModalContext';
import UserFollows from './UserFollows';
import { Follow } from '@/Apis/User/User.type';

export default function FolloweesModal() {
  const modalState = useContext(ModalStateContext);
  const setModalState = useContext(ModalSetterContext);

  function handleFolloweeCloseOnClick() {
    setModalState({ isOpen: false, type: 'followee' });
  }
  return (
    <div className="w-[335px] h-[550px] md:w-[500px] md:h-[600px] xl:w-[500px] xl:h-[660px] relative pl-[20px] md:pl-[40px] pt-[40px] md:pt-[60px] pr-[18px] pb-[6px] md:pb-[16px] xl-[17px] ">
      <button
        type="button"
        onClick={handleFolloweeCloseOnClick}
        className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] xl:w-[40px] xl:h-[40px] absolute right-[15px] md:right-[20px] top-[15px] md:top-[20px] bg-center"
        aria-label="Close"
        style={{
          backgroundImage: 'url(/icons/close-icon.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div>
        <h1 className="font-['Pretendard'] text-white text-[20px] xl:text-[24px] font-semibold leading-[28px] xl:leading-normal ">
          {modalState.nickName}을 팔로잉하는 유저
        </h1>
        <div className="flex flex-col gap-[20px] xl:gap-[25px] mt-[20px] md:mt-[40px] ">
          {modalState.FolloweesInfo?.data?.list.map((followee: Follow) => (
            <UserFollows key={followee.id} Followees={followee} />
          ))}
        </div>
      </div>
    </div>
  );
}
