import Button from '../../Button';

function UserProfileCard() {
  return (
    <article className="flex flex-col items-center gap-[30px] lg:gap-[40px] ml-[40px] px-[20px] md:px-[30px] lg:px-[20px] py-[30px] lg:pt-[40px] lg:pb-[30px] w-[335px] h-[466px] md:w-[509px] md:h-[451px] lg:w-[340px] lg:h-[603px] bg-scblack border-black4 rounded-[12px] ">
      <div
        className="w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] bg-center"
        style={{
          backgroundImage: 'url(/images/img-profile1.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="flex flex-col items-center gap-[10px] lg-gap-[20px]">
        <h1 className="font-['Pretendard'] text-white text-[20px] lg:text-[24px] font-semibold leading-[28px] lg:leading-normal">
          surisuri마수리
        </h1>
        <p className="font-['Pretendard'] text-gray1 text-[14px] lg:text-[16px] font-normal leading-[20px] lg:leading-[22px] ">
          세상에 리뷰 못할 제품은 없다. surisuri마수리와 함께라면 당신도 프로쇼핑러! 안녕하세요, 별점의 화신
          surisuri마수리입니다!
        </p>
      </div>
      <div className="flex ">
        <div className="flex flex-col items-center gap-[10px] pr-[60px] md:pr-[80px] lg:pr-[50px] border-r border-black4">
          <p className="font-['Pretendard'] text-white text-[18px] lg:text-[20px] font-semibold  ">762</p>
          <p className="font-['Pretendard'] text-gray2 text-[14px] lg:text-[16px] font-normal  ">팔로워</p>
        </div>
        <div className="flex flex-col items-center gap-[10px] pl-[60px] md:pl-[80px] lg:pl-[50px] ">
          <p className="font-['Pretendard'] text-white text-[18px] lg:text-[20px] font-semibold  ">102</p>
          <p className="font-['Pretendard'] text-gray2 text-[14px] lg:text-[16px] font-normal  ">팔로잉</p>
        </div>
      </div>
      <Button
        className="w-[295px] h-[50px] md:w-[449px] md:h-[55px] lg:w-[300px] lg:h-[65px] font-['Pretendard'] text-md lg-text-[18px]"
        color="primary"
      >
        팔로우
      </Button>
    </article>
  );
}
export default UserProfileCard;
