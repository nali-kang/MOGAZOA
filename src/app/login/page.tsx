'use client';

import React, { KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';

import NavigationBar from '@/Components/NavigationBar/Navigationbar';
import Button from '@/Components/Commons/Button';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import { IFormInput, defaultLoginFormValues, validate } from '@/Constant/AuthForm.type';
import { ReactComponent as KaKaoIcon } from '@/public/Icons/kakao-icon.svg';

export default function LoginPage() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues: defaultLoginFormValues, mode: 'onTouched' });

  const onKakaoLogin = () => {
    signIn('kakao', { callbackUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}` });
  };

  const onSubmit = async (data: IFormInput) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      console.error('Login failed:', result.error);
    } else {
      console.log('Login successful:', result);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, loginFunction: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      loginFunction();
    }
  };

  const registerList = {
    email: register('email', validate.email),
    password: register('password', validate.password),
  };

  return (
    <div>
      <NavigationBar firstTitle="로그인" secondTitle="회원가입" />
      <div className="flex justify-center content-center">
        <div className="flex flex-col gap-[35px] pt-[80px]">
          {!session ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-[30px]">
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
                  <Button type="submit" color="primary" className="w-[335px] h-[50px] mt-[40px] text-[16px]">
                    로그인
                  </Button>
                </div>
              </form>
              <div className="flex justify-center content-center">
                <div className="flex flex-col gap-[20px] mt-[45px]">
                  <p className="text-gray1 text-center font-normal text-[14px]">SNS로 바로 시작하기</p>
                  <div className="flex flex-row justify-center gap-[25px]">
                    <div
                      onClick={onKakaoLogin}
                      onKeyDown={(event) => handleKeyDown(event, onKakaoLogin)}
                      role="button"
                      tabIndex={0}
                      className="flex w-[56px] h-[56px] justify-center items-center border border-solid rounded-full border-gray1 cursor-pointer"
                      aria-label="카카오 로그인"
                    >
                      <KaKaoIcon className="w-[28px] h-[28px]" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <p>이미 로그인 되었습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
