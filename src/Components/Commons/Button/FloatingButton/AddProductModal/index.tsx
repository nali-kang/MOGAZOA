import { Dropdown, Option } from '@/Components/Commons/Dropdown/DropdownComponent';
import FileInputForm from '@/Components/Commons/Input/FileInputForm/FileInputForm';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import React, { useContext } from 'react';
import Button from '../..';
import Image from 'next/image';
import { ModalSetterContext } from '@/Context/ModalContext';
import { FormProvider, useForm } from 'react-hook-form';
import { usePostProductItems } from '@/Apis/Product/useProduct.Service';
import { usePostImage } from '@/Apis/Image/useImageService';

interface ProductFormInput {
  productName: string;
  productDescription: string;
  imgUrl: string;
  categoryId: number;
}

export default function AddProductModal() {
  const setModalState = useContext(ModalSetterContext);

  const methods = useForm<ProductFormInput>({
    mode: 'onTouched',
    defaultValues: {
      productName: '',
      productDescription: '',
      imgUrl: '',
      categoryId: 1,
    },
  });
  const { handleSubmit, setValue, watch } = methods;
  const registerList = {
    productName: methods.register('productName'),
    productDescription: methods.register('productDescription'),
    imgUrl: methods.register('imgUrl'),
    categoryId: methods.register('categoryId'),
  };

  const postProduct = usePostProductItems({
    categoryId: 1,
    name: '',
    description: '',
    image: '',
  });
  const postImgUrl = usePostImage({ image: '' });

  const option: Option[] = [
    { label: '음악', value: 1 },
    { label: '영화/드라마', value: 2 },
    { label: '강의/책', value: 3 },
    { label: '호텔', value: 4 },
    { label: '가구/인테리어', value: 5 },
    { label: '식당', value: 6 },
    { label: '전자기기', value: 7 },
    { label: '화장품', value: 8 },
    { label: '의류/악세서리', value: 9 },
    { label: '앱', value: 10 },
  ];

  const handleCloseClick = () => {
    setModalState({ isOpen: false, type: 'addProduct' });
  };

  const onSubmit = async (data: ProductFormInput) => {
    const formData = new FormData();
    const file = data.imgUrl[0];
    if (file) {
      formData.append('image', file);
      postImgUrl.mutate(formData, {
        // 이미지 업로드
        onSuccess: (result: any) => {
          const ImageUrl = result.data.url;
          const payload = {
            categoryId: data.categoryId,
            name: data.productName,
            description: data.productDescription,
            image: ImageUrl,
          };
          postProduct.mutate(payload, {
            // 상품 추가
            onSuccess: () => {
              setModalState({ isOpen: false, type: 'addProduct' });
            },
            onError: (error: any) => {
              console.error(error);
            },
          });
        },
        onError: (error: any) => {
          console.error(error);
        },
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-[20px] w-[335px] h-[578px] md:w-[590px] md:h-[569px] lg:w-[620px] lg:h-[614px] px-5 pt-10 pb-4 md:px-[40px] md:pt-[60px] md:pb-[40px]">
        <button
          type="button"
          className="absolute top-[15px] right-[15px] md:top-[20px] md:right-[20px] w-[24px] h-[24px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px] "
          onClick={handleCloseClick}
        >
          <Image src="/Icons/close-icon.svg" alt="close-modal" fill />
        </button>

        <p className="text-[20px] text-white lg:text-[24px] ">상품 추가</p>
        <form className="flex flex-col gap-[10px] md:gap-[15px] lg:gap-[20px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[10px] md:flex-row-reverse md:gap-[15px] lg:gap-[20px]">
            <FileInputForm
              className="w-[140px] h-[140px] md:w-[135px] md:h-[135px] lg:w-[160px] lg:h-[160px] "
              {...registerList.imgUrl}
            />
            <div className="flex flex-col gap-[10px] md:gap-[15px] lg:gap-[20px]">
              <InputForm
                className="w-[295px] h-[55px] md:w-[360px] md:h-[60px] lg:h-[70px]"
                placeholder="상품명 (상품 등록 여부를 확인해 주세요)"
                {...registerList.productName}
              />
              <Dropdown
                option={option}
                value={watch('categoryId')}
                onChange={(value: number) => {
                  setValue('categoryId', value);
                }}
              />
            </div>
          </div>
          <InputForm
            className="w-[295px] h-[120px] md:w-[510px] md:h-[160px] lg:w-[540px] text-xs"
            placeholder="상품 설명을 입력해 주세요"
            {...registerList.productDescription}
            textarea
          />
          <Button className="w-[295px] h-[50px] md:w-[510px] md:h-[55px] lg:w-[540px]" color="primary" type="submit">
            추가하기
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}
