'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Button from '@/Components/Commons/Button';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import { IFormInput, defaultLoginFormValues, validate } from '@/Constant/AuthForm.type';
import AuthService from '@/Apis/Auth/Auth.service';
import { ReactComponent as CloseIcon } from '@/public/Icons/close-icon.svg';
import { ReactComponent as LargeLogoIcon } from '@/public/icons/large-logo-icon.svg';

export default function SignUpPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // 세션이 있으면 홈 페이지로 리디렉션
      router.push('/');
    }
  }, [session, router]);

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
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between items-center w-[400px] mt-[40px]">
        <CloseIcon />
        <LargeLogoIcon />
      </div>
      <div className="flex justify-center content-center">
        <form className="flex flex-col gap-[80px] pt-[20px] mt-[45px]" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputForm
              label="이메일"
              placeholder="이메일을 입력해 주세요"
              className="w-[400px] h-[55px]"
              basicMessage="이메일 형식을 지켜주세요"
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
              className="w-[400px] h-[55px]"
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
              className="w-[400px] h-[55px]"
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
              className="w-[400px] h-[55px]"
              errorMessage={errors.passwordConfirm?.message}
              type="password"
              {...passwordConfirmRegister}
            />
          </div>
          <Button type="submit" color="primary" className="w-[400px] h-[50px] mt-[50px] text-[16px]">
            가입하기
          </Button>
        </form>
      </div>
      <div className="flex justify-center mt-[40px]">
            <p className="text-gray1 text-center font-normal text-[14px]">
              간편하게 로그인을 하고 싶으신가요?
              <span
                role="button"
                tabIndex={0}
                className="text-gradient cursor-pointer ml-2"
                onClick={() => router.push('/signup')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    router.push('/signup');
                  }
                }}
              >
                SNS로 로그인
              </span>
            </p>
          </div>
    </div>
  );
}
