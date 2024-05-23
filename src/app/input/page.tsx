'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import FileInputForm from '@/Components/Commons/Input/FileInputForm/FileInputForm';
import InputForm from '@/Components/Commons/Input/InputForm';
import { defaultLoginFormValues, validate } from '@/Constant/AuthForm.type';

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
  } = useForm<IFormInputs>({ defaultValues: defaultLoginFormValues, mode: 'onTouched' });

  const registerList = {
    email: register('email', validate.email),
    password: register('password', validate.password),
  };

  return (
    <div className="bg-black2 p-3 gap-3">
      <form className="pb-20 w-[140px] h-[140px]">
        <FileInputForm
          label="프로필 편집"
          errorMessage={errors.file ? 'File is required' : undefined}
          register={register('file', { required: true })}
        />
      </form>
      <form>
        <div className="flex gap-4">
          <InputForm
            label="이메일"
            errorMessage={errors.email?.message}
            type="email"
            {...registerList.email}
            name="email"
          />
          <InputForm
            label="비밀번호"
            errorMessage={errors.password?.message}
            type="password"
            {...registerList.password}
            name="password"
          />
        </div>
      </form>
      <form>
        <InputForm label="텍스트" textarea {...registerList.password} name="password" />
      </form>
    </div>
  );
}
