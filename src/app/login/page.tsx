'use client';

import React, { useEffect, useState, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Button from '@/Components/Commons/Button';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import { IFormInput, defaultLoginFormValues, validate } from '@/Constant/AuthForm.type';
import { ReactComponent as KaKaoIcon } from '@/public/Icons/kakao-icon.svg';
import { ReactComponent as GoogleIcon } from '@/public/Icons/google-icon.svg';
import { ReactComponent as CloseIcon } from '@/public/Icons/close-icon.svg';
import { ReactComponent as LargeLogoIcon } from '@/public/icons/large-logo-icon.svg';
import { ReactComponent as CheckTrue } from '@/public/Icons/checkbox-true.svg';
import { ReactComponent as CheckNone } from '@/public/Icons/checkbox-none.svg';

const MySwal = withReactContent(Swal);

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  console.log('Session data:', session);

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

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues: defaultLoginFormValues, mode: 'onTouched' });

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const onKakaoLogin = () => {
    signIn('kakao', { callbackUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}` });
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

  // sweet alert
  const onSubmit = async (data: IFormInput) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      maxAge: rememberMe ? 2592000 : undefined,
    });

    if (result?.error) {
      console.error('Login failed:', result.error);
      showToast('error', '로그인 실패', '비밀번호를 확인해 주세요.');
    } else {
      console.log('Login successful:', result);
      showToast('success', '로그인 되었습니다', '서비스를 이용해 주세요.');
      router.push('/');
    }
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between items-center w-[400px] mt-[70px]">
        <CloseIcon />
        <LargeLogoIcon />
      </div>
      <div className="flex justify-center content-center">
        <div className="flex flex-col gap-[50px] pt-[80px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[40px]">
              <div>
                <InputForm
                  placeholder="아이디" 
                  className="w-[400px] h-[55px]"
                  errorMessage={errors.email?.message}
                  type="email"
                  {...registerList.email}
                  name="email"
                />
              </div>
              <div>
                <InputForm
                  placeholder="비밀번호"
                  className="w-[400px] h-[55px]"
                  errorMessage={errors.password?.message}
                  type="password"
                  {...registerList.password}
                  name="password"
                />
              </div>
              <Button type="submit" color="primary" className="w-[400px] h-[50px] mt-[10px] text-[16px]">
                로그인
              </Button>
              <div className="flex items-center gap-2 mt-[-15px]">
                <button
                  type="button"
                  onClick={toggleRememberMe}
                  aria-pressed={rememberMe}
                  className="cursor-pointer"
                >
                  {rememberMe ? <CheckTrue className="w-[20px] h-[20px]" /> : <CheckNone className="w-[20px] h-[20px]" />}
                </button>
                <button
                  type="button"
                  onClick={toggleRememberMe}
                  className="ml-2 block	text-sm text-gray1 cursor-pointer"
                >
                  로그인 상태 유지하기
                </button>
              </div>
            </div>
          </form>
          <div className="flex justify-center mt-[20px]">
            <p className="text-gray1 text-center font-normal text-[14px] font-semibold">
              회원이 아니신가요?
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
                회원가입 하기
              </span>
            </p>
          </div>
          <div className="flex justify-center content-center">
            <div className="flex flex-col gap-[20px] mt-[-35px]">
              <p className="text-gray1 text-center font-semibold	 text-[14px]">SNS로 바로 시작하기</p>
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
                <div
                  onClick={onKakaoLogin}
                  onKeyDown={(event) => handleKeyDown(event, onKakaoLogin)}
                  role="button"
                  tabIndex={0}
                  className="flex w-[56px] h-[56px] justify-center items-center border border-solid rounded-full border-gray1 cursor-pointer"
                  aria-label="구글 로그인"
                >
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
