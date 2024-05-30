'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import NavigationBar from '@/Components/NavigationBar/Navigationbar';
import Button from '@/Components/Commons/Button';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import { IFormInput, defaultLoginFormValues, validate} from '@/Constant/AuthForm.type';
import { ReactComponent as KaKaoIcon } from '@/public/Icons/kakao-icon.svg';
import { ReactComponent as GoogleIcon } from '@/public/Icons/google-icon.svg';

export default function LoginPage() {
  const {
    // handleSubmit,
    register,
    formState: { errors, /* isValid */ },
  } = useForm<IFormInput>({ defaultValues: defaultLoginFormValues, mode: 'onTouched' });

  const registerList = {
    email: register('email', validate.email),
    password: register('password', validate.password),
  };

  return (
    <div>
      <NavigationBar firstTitle="로그인" secondTitle="회원가입" />
      <div className="flex justify-center content-center">
        <div className="flex flex-col gap-[35px] pt-[80px]">
          <div>
            <InputForm
              label="이메일"
              className="w-[335px] h-[55px]"
              errorMessage={errors.email?.message}
              type="email"
              {...registerList.email}
              name="email"
            />
          </div>
          <div>
            <InputForm
              label="비밀번호"
              className="w-[335px] h-[55px]"
              errorMessage={errors.password?.message}
              type="password"
              {...registerList.password}
              name="password"
            />
          </div>
          <Button color="primary" className="w-[335px] h-[50px] mt-[25px] text-[16px]">
            로그인
          </Button>
          <div className="flex justify-center content-center">
            <div className="flex flex-col gap-[20px] mt-[45px]">
              <p className="text-gray1 text-center font-normal text-[14px]">SNS로 바로 시작하기</p>
              <div className="flex flex-row	justify-center gap-[25px]">
                <div className="flex w-[56px] h-[56px] justify-center items-center border border-solid rounded-full border-gray1 cursor-pointer">
                  <KaKaoIcon className="w-[28px] h-[28px]" />
                </div>
                <div className="flex w-[56px] h-[56px] justify-center items-center border border-solid rounded-full border-gray1 cursor-pointer">
                  <GoogleIcon className="w-[28px] h-[28px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
