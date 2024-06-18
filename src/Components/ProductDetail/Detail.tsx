import Image from 'next/image';
import Button from '../Commons/Button';
import CategoryChip from '../Commons/Chip/CategoryChip';
import { useContext } from 'react';
import { ModalSetterContext } from '@/Context/ModalContext';
import clip from '@/Utils/clip';
import isMyProduct from '@/Utils/isMyProduct';
import FavoriteProductButton from './FavoriteProductButton';

export default function Detail({ data }: any) {
  const isOpenModal = useContext(ModalSetterContext);

  const handleReviewButton: React.MouseEventHandler<HTMLButtonElement> = () => {
    isOpenModal({ isOpen: true, type: 'createReview' });
  };
  const handleEditButton: React.MouseEventHandler<HTMLButtonElement> = () => {
    isOpenModal({ isOpen: true, type: 'editProduct' });
  };

  const handleCompareButton: React.MouseEventHandler<HTMLButtonElement> = () => {
    isOpenModal({
      isOpen: true,
      type: 'compare',
      // 비교하기 추가할 상품의 id와 이름을 각각 value와 label로 넣어주시면 됩니다.
      productInfo: { value: data.id, label: data.name },
    });
  };

  // console.log('바깥', data);
  return (
    <div className="w-[335px] justify-center items-center gap-10 mt-[30px] mx-5 md:w-[684px] md:h-[285px] xl:w-[940px] md:flex">
      <Image
        src={data.image}
        alt={data.name}
        width={335}
        height={236}
        className="rounded-md md:w-[280px] md:h-[197px] xl:w-[355px] xl:h-[249px]"
      />
      <div className="flex-col justify-center items-start gap-10">
        <div className="w-[335px] md:w-[384px] flex-col justify-start items-start gap-5 flex mb-10">
          <div className="flex-col justify-start items-start gap-2.5 flex">
            <div className="w-[335px] md:w-[384px] h-[22px] justify-between items-center flex mt-5 relative">
              <CategoryChip category={data.category.name} />
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
                  onClick={clip}
                >
                  <Image src="/icons/share-icon.svg" alt="공유 아이콘" width={11.67} height={10.77} />
                </button>
              </div>
            </div>
            <div className="w-[335px] md:w-[310px] xl:w-[480px] justify-between items-center inline-flex">
              <div className="w-[335px] md:w-[384px] text-gray-100 text-xl font-semibold font-['Pretendard'] leading-7">
                {data.name}
              </div>
              <FavoriteProductButton productId={data.id} isFavorite={data.isFavorite} />
            </div>
          </div>
          <div className="w-[335px] md:w-[384px] xl:w-[545px] text-gray-100 text-sm font-normal font-['Pretendard'] leading-5">
            {data.description}
          </div>
        </div>
        {/* {isMyProduct(data.writerId, 158) ? ( // TODO: 두번 째 파라미터값 내 아이디 넣기(쿠키로 내 아이디 저장해두고 가져올까?) */}
        {true ? (
          <div className="w-[335px] md:w-[384px] xl:w-[545px] gap-[15px] md:gap-2 md:flex">
            <Button
              onClick={handleReviewButton}
              color="primary"
              className="h-[50px] w-[335px] md:w-[140px] xl:w-[185px]"
            >
              리뷰 작성하기
            </Button>
            <div className="h-[15px]" />
            <Button
              color="secondary"
              variant="disabledBased"
              className="h-[50px] w-[335px] md:w-[107px] xl:w-[160px]"
              onClick={handleCompareButton}
            >
              비교하기
            </Button>
            <div className="h-[15px]" />
            <Button
              color="secondary"
              className="h-[50px] w-[335px] md:w-[107px] xl:w-[160px]"
              onClick={handleEditButton}
            >
              편집하기
            </Button>
          </div>
        ) : (
          <div className="w-[335px] md:w-[384px] xl:w-[545px] gap-[15px] md:gap-2 md:flex">
            <Button
              color="primary"
              className="h-[50px] w-[335px] md:w-[246px] xl:w-[345px]"
              onClick={handleReviewButton}
            >
              리뷰 작성하기
            </Button>
            <div className="h-[15px]" />
            <Button
              color="secondary"
              variant="disabledBased"
              className="h-[50px] w-[335px] md:w-[123px] xl:w-[180px]"
              onClick={handleCompareButton}
            >
              비교하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
