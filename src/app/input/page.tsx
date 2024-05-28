'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import FileInputForm from '@/Components/Commons/Input/FileInputForm/FileInputForm';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';

export interface IFormInputs {
  category?: string;
  review?: string;
  file?: FileList;
  bio?: string;
}

export default function InputPage() {
  const { register, watch } = useForm<IFormInputs>({
    mode: 'onTouched',
    defaultValues: {
      review: '',
      category: '',
      bio: '',
    },
  });

  // 테스트: 입력 값이 변경될 때마다 콘솔에 로그를 찍는 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('기본 이벤트 타겟 값', event.target.value);
  };

  // 테스트: defaultValues로 지정한 값들을 watch로 감시
  const watchReview = watch('review');
  const watchCategory = watch('category');
  const watchBio = watch('bio');
  const watchFile = watch('file');

  // 테스트: defaultValues 출력
  React.useEffect(() => {
    console.log(`Review: ${watchReview}`);
    console.log(`Category: ${watchCategory}`);
    console.log(`Bio: ${watchBio}`);
    if (watchFile && watchFile.length > 0) {
      console.log(`Total Files: ${watchFile.length}`);
      Array.from(watchFile).forEach((file, index) => {
        console.log(`File ${index + 1}: `, file.name, file.type, file.size);
      });
    }
  }, [watchReview, watchCategory, watchBio, watchFile]);

  return (
    <div className="flex flex-col bg-black2 p-3 gap-4">
      <div className="flex gap-4">
        <form>
          <FileInputForm
            className="w-[135px] h-[135px] "
            register={register('file', { required: true })}
            {...register('file', {
              onChange: handleInputChange,
            })}
          />
        </form>
        <form className="flex flex-col justify-between w-[360px]">
          <div>
            <InputForm
              className="w-[360px] h-[55px] text-xs"
              placeholder="상품평 (상품 등록 여부를 확인해 주세요)"
              type="text"
              {...register('review', {
                onChange: handleInputChange,
              })}
            />
          </div>
          <div>
            <InputForm
              className="w-[360px] h-[55px] text-xs"
              placeholder="카테고리 선택"
              type="text"
              {...register('category', {
                onChange: handleInputChange,
              })}
            />
          </div>
        </form>
      </div>
      <div>
        <form>
          <InputForm className="w-[512px] h-[170px] text-xs" placeholder="설명을 입력해주세요." textarea />
        </form>
      </div>
    </div>
  );
}
