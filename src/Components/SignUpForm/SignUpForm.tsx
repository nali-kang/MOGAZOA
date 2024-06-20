'use client';

import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Button from '@/Components/Commons/Button';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import { IFormInput, defaultLoginFormValues, validate } from '@/Constant/AuthForm.type';
import AuthService from '@/Apis/Auth/Auth.service';
import { ReactComponent as LargeLogoIcon } from '@/public/icons/large-logo-icon.svg';
import { ReactComponent as CloseIcon } from '@/public/Icons/close-icon.svg';
import Link from 'next/link';

const MySwal = withReactContent(Swal);

export default function SignUpForm() {
  const methods = useForm<IFormInput>({
    defaultValues: defaultLoginFormValues,
    mode: 'onTouched',
  });

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // 세션이 있으면 홈 페이지로 리디렉션
      router.push('/');
    }
  }, [session, router]);

  const showToast = (type: 'success' | 'error', title: string, text: string) => {
    MySwal.fire({
      toast: true,
      position: 'top',
      icon: type,
      title,
      text,
      showConfirmButton: false,
      timer: 3000,
      background: '#22222c',
      color: '#fff',
      customClass: {
        popup: 'custom-toast',
      },
    });
  };

  const handleSignupSuccess = () => {
    showToast('success', '회원가입 성공', '회원가입이 성공적으로 완료되었습니다.');
    setTimeout(() => {
      router.push('/login');
    }, 2000); // 3초 후에 로그인 페이지로 리디렉션
  };

  const handleSignupError = (error: any) => {
    showToast('error', '회원가입 실패', '회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.');
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
    email: methods.register('email', validate.email),
    nickname: methods.register('nickname', validate.nickname),
    password: methods.register('password', validate.password),
  };

  const passwordConfirmRegister = methods.register('passwordConfirm', {
    validate: {
      matchPassword: (value) => {
        const passwordState = methods.watch('password');
        return passwordState === value || '비밀번호가 일치하지 않습니다.';
      },
    },
    required: '비밀번호를 확인해주세요',
  });
  console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex justify-center items-center w-[300px] sm:w-[400px] mt-[10px] sm:mt-[70px] mb-[70px] sm:mb-[90px]">
          <Link href="/">
            <LargeLogoIcon className="cursor-pointer" />
          </Link>
        </div>
        <div className="p-4 sm:p-8 w-[350px] sm:w-[500px]">
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-12">
            <div className="relative">
              <InputForm
                id="email"
                placeholder="이메일"
                className="input-autocomplete w-full h-12 bg-transparent border-0 border-b-[1.5px] border-gray1 rounded-none pl-0"
                basicMessage="이메일 형식을 지켜주세요"
                errorMessage={methods.formState.errors.email?.message}
                type="email"
                {...registerList.email}
                name="email"
              />
              {methods.watch('email') && (
                <button
                  type="button"
                  onClick={() => methods.setValue('email', '')}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 p-1"
                  aria-label="Clear input"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            <div className="relative">
              <InputForm
                placeholder="닉네임"
                className="input-autocomplete w-full h-12 bg-transparent border-0 border-b-[1.5px] border-gray1 rounded-none pl-0"
                basicMessage="최대 10글자 가능"
                errorMessage={methods.formState.errors.nickname?.message}
                type="text"
                {...registerList.nickname}
                name="nickname"
                id="nickname"
              />
              {methods.watch('nickname') && (
                <button
                  type="button"
                  onClick={() => methods.setValue('nickname', '')}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 p-1"
                  aria-label="Clear input"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            <div className="relative">
              <InputForm
                placeholder="비밀번호"
                className="input-autocomplete w-full h-12 bg-transparent border-0 border-b-[1.5px] border-gray1 rounded-none pl-0"
                basicMessage="최소 8글자"
                errorMessage={methods.formState.errors.password?.message}
                type="password"
                {...registerList.password}
                name="password"
                id="password"
              />
              {methods.watch('password') && (
                <button
                  type="button"
                  onClick={() => methods.setValue('password', '')}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 p-1"
                  aria-label="Clear input"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            <div className="relative">
              <InputForm
                placeholder="비밀번호 확인"
                className="input-autocomplete w-full h-12 bg-transparent border-0 border-b-[1.5px] border-gray1 rounded-none pl-0"
                errorMessage={methods.formState.errors.passwordConfirm?.message}
                type="password"
                {...passwordConfirmRegister}
                id="passwordConfirm"
              />
              {methods.watch('passwordConfirm') && (
                <button
                  type="button"
                  onClick={() => methods.setValue('passwordConfirm', '')}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 p-1"
                  aria-label="Clear input"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            <Button type="submit" color="primary" className="w-full h-12">
              가입하기
            </Button>
          </form>
          <div className="flex flex-col space-y-4 mt-6">
            <div className="relative flex items-center justify-center mt-[60px] mb-[60px]">
              <div className="flex-grow border-0 border-b-[1px] border-[#443f3f]" />
              <span className="mx-2 text-gray1 text-[12px] font-semibold">또는</span>
              <div className="flex-grow border-0 border-b-[1px] border-[#443f3f]" />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <p className="text-gray1 text-center font-semibold text-[14px]">
              간편하게
              <span
                role="button"
                tabIndex={0}
                className="text-gradient cursor-pointer ml-2"
                onClick={() => router.push('/login')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    router.push('/login');
                  }
                }}
              >
                SNS로 로그인
              </span>
            </p>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
