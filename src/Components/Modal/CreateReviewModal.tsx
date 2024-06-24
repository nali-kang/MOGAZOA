'use client';

import FileInputForm from '@/Components/Commons/Input/FileInputForm/FileInputForm';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { ModalSetterContext } from '@/Context/ModalContext';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../Commons/Button';
import CategoryChip from '../Commons/Chip/CategoryChip';
import { Rating } from 'react-simple-star-rating';
import { usePostImage } from '@/Apis/Image/useImageService';
import { useParams, useRouter } from 'next/navigation';
import { useGetProductDetail } from '@/Apis/Product/useProduct.Service';
import { usePostReview } from '@/Apis/Review/useReview.Service';
import { QueryClient } from '@tanstack/react-query';
import { transliterate } from 'transliteration';

interface ProductReviewFormInput {
  productId: number;
  images: FileList;
  content: string;
  rating: number;
}

export default function CreateReviewModal() {
  // 라우터
  const router = useRouter();
  // productId
  const { productId } = useParams() as { productId: string };
  const numberProductId = parseInt(productId, 10);
  // 별점 관련
  const [rating, setRating] = useState(0);
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  // 모달 상태
  const setModalState = useContext(ModalSetterContext);
  const handleCloseClick = () => {
    setModalState({ isOpen: false, type: '' });
  };
  // 폼 관련
  const methods = useForm<ProductReviewFormInput>({
    mode: 'onTouched',
    defaultValues: {
      images: new DataTransfer().files,
    },
  });
  const { handleSubmit } = methods;

  const registerList = {
    productId: methods.register('productId'),
    images: methods.register('images'),
    content: methods.register('content'),
    rating: methods.register('rating'),
  };

  // API
  const datas = useGetProductDetail(numberProductId);
  const postImgUrl = usePostImage({ image: '' });
  const postReview = usePostReview({
    productId: numberProductId,
    images: [''],
    content: '',
    rating: 1,
  });

  const queryClient = new QueryClient();

  const submitReview = (params: any) => {
    postReview.mutate(params, {
      onSuccess: () => {
        setModalState({ isOpen: false, type: '' });
        try {
          queryClient.invalidateQueries({
            queryKey: ['getProductReviewList', { productId: numberProductId }],
          });
        } catch (error) {
          console.error(error);
        } finally {
          // router.refresh();
          // TODO: 새로고침 말고 다른 방법으로
          window.location.reload();
        }
      },
      onError: (error: any) => {
        console.error(error);
      },
    });
  };

  const onSubmit = async (data: ProductReviewFormInput) => {
    const formData = new FormData();
    const file = data.images[0];
    if (file) {
      const transliteratedFileName = transliterate(file.name);
      const renamedFile = new File([file], transliteratedFileName, { type: file.type });
      formData.append('image', renamedFile);
      postImgUrl.mutate(formData, {
        onSuccess: (result: any) => {
          const ImageUrl = result.data.url;
          const params = {
            productId: numberProductId,
            images: [ImageUrl],
            content: data.content,
            rating,
          };
          submitReview(params);
        },
        onError: (error: any) => {
          console.error(error);
        },
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex-col justify-center items-center gap-[20px] w-[335px] h-[518px] md:w-[590px] md:h-[642px] lg:w-[620px] lg:h-[689px] px-5 pt-5 pb-4 md:px-[40px] md:pt-[60px] md:pb-[40px] m-7 relative">
        <button
          type="button"
          className="absolute top-[15px] right-[15px] md:top-[20px] md:right-[20px] w-[24px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px]"
          onClick={handleCloseClick}
        >
          <Image src="/Icons/close-icon.svg" alt="close-modal" fill />
        </button>
        <CategoryChip category={datas.data.category.name} />
        <p className="text-[20px] text-white lg:text-[24px] mt-2">{datas.data.name}</p>
        <form className="flex flex-col gap-[10px] md:gap-[15px] lg:gap-[20px] mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 md:gap-[15px] lg:gap-[20px]">
            <div className="flex gap-2 justify-start  items-center">
              <p className="text-gray-500">별점</p>
              <Rating
                onClick={handleRating}
                size={28}
                SVGstyle={{ display: 'inline' }}
                /* Available Props */
              />
            </div>
            <InputForm
              className="w-[295px] h-[120px] md:w-[510px] md:h-[160px] lg:w-[540px] text-xs"
              placeholder="리뷰를 작성해 주세요"
              textarea
              {...registerList.content}
            />
            <FileInputForm
              className="w-[140px] h-[140px] md:w-[135px] md:h-[135px] lg:w-[160px] lg:h-[160px]"
              {...registerList.images}
            />
          </div>
          <Button
            className="w-[295px] h-[50px] md:w-[510px] md:h-[55px] lg:w-[540px] mt-4"
            color="primary"
            type="submit"
          >
            작성하기
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}
