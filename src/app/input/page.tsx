'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import FileInputForm from '@/Components/Commons/Input/FileInputForm/FileInputForm';
import InputForm from '@/Components/Commons/Input/InputForm';

export interface IFormInputs {
  email: string;
  password: string;
  passwordConfirm?: string;
  type?: string;
  file?: FileList;
}

export default function InputPage() {
  const {
    register,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: 'onTouched' });

  return (
    <div className="flex flex-col bg-black2 p-3 gap-4">
      <div className="flex gap-4 h-[140px]">
        <form className="h-[140px] w-[140px]">
          <FileInputForm
            errorMessage={errors.file ? 'File is required' : undefined}
            register={register('file', { required: true })}
            className="h-full"
          />
        </form>
        <form className="flex flex-col justify-between w-[360px]">
          <div>
            <InputForm
              className="w-[360px] h-[55px]"
              placeholder="상품평 (상품 등록 여부를 확인해 주세요)"
              type="text"
              {...register('email')}
            />
          </div>
          <div>
            <InputForm
              className="w-[360px] h-[60px]"
              placeholder="카테고리 선택"
              type="text"
              {...register('password')}
            />
          </div>
        </form>
      </div>
      <div>
        <form>
          <InputForm className="w-[515px] h-[470px] text-xl" textarea {...register('password')} />
        </form>
      </div>
    </div>
  );
}
