import Image from 'next/image';
import Button from '../Commons/Button';
import CategoryChip from '../Commons/Chip/CategoryChip';

export default function Detail() {
  // TODO: product id 받아서 id에 맞는 값 api에서 가져오기
  const user = 'my';
  return (
    <div className="w-[335px] justify-center items-center gap-10 mt-[30px] mx-5 md:w-[684px] md:h-[285px] xl:w-[940px] md:flex">
      <Image
        src="/images/sony-headset.svg"
        alt="헤드셋"
        width={335}
        height={236}
        className="rounded-md md:w-[280px] md:h-[197px] xl:w-[355px] xl:h-[249px]"
      />
      <div className="flex-col justify-center items-start gap-10">
        <div className="w-[335px] md:w-[384px] flex-col justify-start items-start gap-5 flex mb-10">
          <div className="flex-col justify-start items-start gap-2.5 flex">
            <div className="w-[335px] md:w-[384px] h-[22px] justify-between items-center flex mt-5 relative">
              <CategoryChip category="전자기기" />
              <div className="justify-start items-center gap-2.5 flex md:absolute md:top-[34px] md:right-[7px] xl:top-9 xl:right-[-160px]">
                <button
                  type="button"
                  className="p-[5px] bg-scblack rounded-md justify-center items-center flex w-6 h-6"
                >
                  <Image src="/icons/kakao-icon.svg" alt="카카오아이콘" width={11.67} height={10.77} />
                </button>
                <button
                  type="button"
                  className="p-[5px] bg-scblack rounded-md justify-center items-center flex w-6 h-6"
                >
                  <Image src="/icons/share-icon.svg" alt="공유 아이콘" width={11.67} height={10.77} />
                </button>
              </div>
            </div>
            <div className="w-[335px] md:w-[310px] xl:w-[480px] justify-between items-center inline-flex">
              <div className="w-[335px] md:w-[384px] text-gray-100 text-xl font-semibold font-['Pretendard'] leading-7">
                Sony WH-1000XM3
              </div>
              <button type="button">
                <Image src="/icons/unsave-icon.svg" alt="하트 아이콘" width={24} height={24} />
              </button>
            </div>
          </div>
          <div className="w-[335px] md:w-[384px] xl:w-[545px] text-gray-100 text-sm font-normal font-['Pretendard'] leading-5">
            한층 업그레이드된 고급 노이즈 캔슬과 상황에 맞게 조정되는 스마트 청취 기능을 갖춘 WH-1000XM3 헤드폰으로 더욱
            깊은 고요 속에서 청취할 수 있습니다.
          </div>
        </div>
        {user === 'my' ? (
          <div className="w-[335px] md:w-[384px] xl:w-[545px] gap-[15px] md:gap-2 md:flex">
            <Button color="primary" className="h-[50px] w-[335px] md:w-[140px] xl:w-[185px]">
              리뷰 작성하기
            </Button>
            <div className="h-[15px]" />
            <Button color="secondary" variant="disabledBased" className="h-[50px] w-[335px] md:w-[107px] xl:w-[160px]">
              비교하기
            </Button>
            <div className="h-[15px]" />
            <Button color="secondary" className="h-[50px] w-[335px] md:w-[107px] xl:w-[160px]">
              편집하기
            </Button>
          </div>
        ) : (
          <div className="w-[335px] md:w-[384px] xl:w-[545px] gap-[15px] md:gap-2 md:flex">
            <Button color="primary" className="h-[50px] w-[335px] md:w-[246px] xl:w-[345px]">
              리뷰 작성하기
            </Button>
            <div className="h-[15px]" />
            <Button color="secondary" variant="disabledBased" className="h-[50px] w-[335px] md:w-[123px] xl:w-[180px]">
              비교하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
