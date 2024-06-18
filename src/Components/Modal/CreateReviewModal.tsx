import { Dropdown, Option } from '@/Components/Commons/Dropdown/DropdownComponent';
import FileInputForm from '@/Components/Commons/Input/FileInputForm/FileInputForm';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { ModalSetterContext } from '@/Context/ModalContext';
import { useForm } from 'react-hook-form';
import Button from '../Commons/Button';
import CategoryChip from '../Commons/Chip/CategoryChip';
import { Rating } from 'react-simple-star-rating';

// import { usePostImage } from '@/Apis/Image/useImageService';
// import { usePostProductItems } from '@/Apis/Product/useProduct.Service';

interface ProductReviewFormInput {
  productId: string;
  images: string[];
  content: string;
  rating: number;
}

export default function CreateReviewModal() {
  const [rating, setRating] = useState(0);
  const setModalState = useContext(ModalSetterContext);
  const { register, watch, setValue, handleSubmit } = useForm<ProductReviewFormInput>({
    mode: 'onTouched',
    defaultValues: {
      productId: '',
      images: [''],
      content: '',
      rating: 0,
    },
  });
  const watchProductName = watch('productId');
  const watchProductDescription = watch('images');
  const watchImgUrl = watch('content');
  const watchCategoryId = watch('rating');
  // const { mutate: postImage } = usePostImage({ image: watchImgUrl });
  // const { mutate: postProduct } = usePostProductItems();

  const option: Option[] = [
    { label: '음악', value: 1 },
    { label: '영화/드라마', value: 2 },
    { label: '강의/책', value: 3 },
    { label: '호텔', value: 4 },
    { label: '가구/인테리어', value: 5 },
    { label: '식당', value: 6 },
  ];

  const handleCloseClick = () => {
    setModalState({ isOpen: false, type: '' });
  };

  function handleRating() {}

  // 임시
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: ProductFormInput) => {
    console.log(watchProductName);
    console.log(watchProductDescription);
    console.log(watchCategoryId);
    console.log(watchImgUrl);
    // const imageUrl = await postImage(data.imgUrl);
    // const payload = {
    //   categoryId: selectOption,
    //   image: imageUrl,
    //   description: data.productDescription,
    //   name: data.productName,
    // };
    // console.log(imageUrl);
    // await postProduct(payload);
  };

  return (
    <div className="flex-col justify-center items-center gap-[20px] w-[335px] h-[518px] md:w-[590px] md:h-[642px] lg:w-[620px] lg:h-[689px] px-5 pt-5 pb-4 md:px-[40px] md:pt-[60px] md:pb-[40px] m-7 relative">
      <button
        type="button"
        className="absolute top-[15px] right-[15px] md:top-[20px] md:right-[20px] w-[24px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px]"
        onClick={handleCloseClick}
      >
        <Image src="/Icons/close-icon.svg" alt="close-modal" fill />
      </button>
      {/* TODO: 데이터 받아서 카테고리 */}
      <CategoryChip category="식당" />
      <p className="text-[20px] text-white lg:text-[24px] mt-2">제품명 들어갈 자리</p>
      <form className="flex flex-col gap-[10px] md:gap-[15px] lg:gap-[20px] mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 md:gap-[15px] lg:gap-[20px]">
          <div className="flex gap-2 justify-start  items-center">
            <p className="text-gray-500">별점</p>
            <Rating
              size={28}
              SVGstyle={{ display: 'inline' }}
              {...register('rating')}
              /* Available Props */
            />
          </div>
          <InputForm
            className="w-[295px] h-[120px] md:w-[510px] md:h-[160px] lg:w-[540px] text-xs"
            placeholder="리뷰를 작성해 주세요"
            {...register('content')}
            textarea
          />
          <FileInputForm
            className="w-[140px] h-[140px] md:w-[135px] md:h-[135px] lg:w-[160px] lg:h-[160px]"
            register={register('imgUrl', { required: true })}
            {...register('images')}
          />
        </div>
        <Button className="w-[295px] h-[50px] md:w-[510px] md:h-[55px] lg:w-[540px] mt-4" color="primary" type="submit">
          작성하기
        </Button>
      </form>
    </div>
  );
}
