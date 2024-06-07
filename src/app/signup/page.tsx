'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import NavigationBar from '@/Components/NavigationBar/Navigationbar';
import Button from '@/Components/Commons/Button';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import { IFormInput, defaultLoginFormValues, validate } from '@/Constant/AuthForm.type';
import AuthService from '@/Apis/Auth/Auth.service';

export default function SignUpPage() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues: defaultLoginFormValues, mode: 'onTouched' });

  const handleSignupSuccess = () => {
    console.log('성공');
  };

  const handleSignupError = (error: any) => {
    console.error('회원가입 실패:', error);
  };

  const onSubmit = async (payload: IFormInput) => {
    const { passwordConfirm, ...dataToSubmit } = payload;
    console.log('보내는 데이터:', {
      email: dataToSubmit.email,
      nickname: dataToSubmit.nickname,
      password: dataToSubmit.password,
      passwordConfirmation: passwordConfirm,
    });
    try {
      const response = await AuthService.postAuthSignUp({
        email: dataToSubmit.email,
        nickname: dataToSubmit.nickname,
        password: dataToSubmit.password,
        passwordConfirmation: passwordConfirm,
      });
      console.log('회원가입 성공:', response.data);
      handleSignupSuccess();
    } catch (error) {
      handleSignupError(error);
    }
  };

  const registerList = {
    email: register('email', validate.email),
    nickname: register('nickname', validate.nickname),
    password: register('password', validate.password),
  };

  const passwordConfirmRegister = register('passwordConfirm', {
    validate: {
      matchPassword: (value) => {
        const passwordState = watch('password');
        return passwordState === value || '비밀번호가 일치하지 않습니다.';
      },
    },
    required: '비밀번호를 확인해주세요',
  });
  console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);

  return (
    <div>
      <NavigationBar firstTitle="로그인" secondTitle="회원가입" />
      <div className="flex justify-center content-center">
        <form className="flex flex-col gap-[35px] pt-[20px]" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputForm
              label="이메일"
              placeholder="이메일을 입력해 주세요"
              className="w-[335px] h-[55px]"
              errorMessage={errors.email?.message}
              type="email"
              {...registerList.email}
              name="email"
            />
          </div>
          <div>
            <InputForm
              label="닉네임"
              placeholder="닉네임을 입력해 주세요"
              className="w-[335px] h-[55px]"
              basicMessage="최대 10글자 가능"
              errorMessage={errors.nickname?.message}
              type="text"
              {...registerList.nickname}
              name="nickname"
            />
          </div>
          <div>
            <InputForm
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              className="w-[335px] h-[55px]"
              basicMessage="최소 8글자"
              errorMessage={errors.password?.message}
              type="password"
              {...registerList.password}
              name="password"
            />
          </div>
          <div>
            <InputForm
              label="비밀번호 확인"
              placeholder="비밀번호를 확인해 주세요"
              className="w-[335px] h-[55px]"
              errorMessage={errors.passwordConfirm?.message}
              type="password"
              {...passwordConfirmRegister}
            />
          </div>
          <Button type="submit" color="primary" className="w-[335px] h-[50px] mt-[150px] text-[16px]">
            가입하기
          </Button>
        </form>
      </div>
    </div>
  );
}
