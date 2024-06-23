'use client';

import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSession, signIn as nextAuthSignIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { usePostAuthSignIn, usePostOAuthSignIn } from '@/Apis/Auth/useAuthService';
import Button from '@/Components/Commons/Button';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import { IFormInput, defaultLoginFormValues, validate } from '@/Constant/AuthForm.type';
import { ReactComponent as KaKaoIcon } from '@/public/Icons/kakao-icon.svg';
import { ReactComponent as GoogleIcon } from '@/public/Icons/google-icon.svg';
import { ReactComponent as LargeLogoIcon } from '@/public/icons/large-logo-icon.svg';
import { ReactComponent as CheckTrue } from '@/public/Icons/checkbox-true.svg';
import { ReactComponent as CheckNone } from '@/public/Icons/checkbox-none.svg';
import { ReactComponent as CloseIcon } from '@/public/Icons/close-icon.svg';
import Cookies from 'js-cookie';
import Link from 'next/link';

const MySwal = withReactContent(Swal);

export default function LoginForm() {
  const methods = useForm<IFormInput>({
    defaultValues: defaultLoginFormValues,
    mode: 'onTouched',
  });

  const { data: userSession } = useSession();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const signIn = usePostAuthSignIn({
    email: '',
    password: '',
  });
  const { mutate: postOAuthSignIn } = usePostOAuthSignIn('', { redirectUri: '', token: '' });

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

  useEffect(() => {
    if (userSession) {
      router.push('/');
    }
  }, [userSession, router]);

  const onOAuthLogin = async (provider: string) => {
    try {
      const result = await nextAuthSignIn(provider, { redirect: false, callbackUrl: `http://localhost:3000/` });

      if (result?.error) {
        showToast('error', `${provider} 로그인 실패`, '다시 시도해 주세요.');
      } else {
        const session = await getSession();
        const accessToken = session?.accessToken;

        if (accessToken) {
          postOAuthSignIn(
            { provider, payload: { redirectUri: `http://localhost:3000/login`, token: accessToken } },
            {
              onSuccess: (data: any) => {
                const backendToken = data.accessToken;
                Cookies.set('token', backendToken, { expires: rememberMe ? 30 : 1 });
                showToast('success', '로그인 되었습니다', '서비스를 이용해 주세요.');
                router.push('/');
              },
              onError: (error: any) => {
                showToast('error', '토큰 요청 실패', error.message || '다시 시도해 주세요.');
              },
            }
          );
        } else {
          showToast('error', '로그인 실패', '다시 시도해 주세요.');
        }
      }
    } catch (error) {
      showToast('error', '로그인 실패', '다시 시도해 주세요.');
    }
  };

  const registerList = {
    email: methods.register('email', validate.email),
    password: methods.register('password', validate.password),
  };

  const onSubmit = async (data: IFormInput) => {
    signIn.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: async (result: any) => {
          await nextAuthSignIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
          });

          const token = result?.data?.accessToken;
          if (token) {
            Cookies.set('token', token, { expires: rememberMe ? 30 : 1 });
          }

          showToast('success', '로그인 되었습니다', '서비스를 이용해 주세요.');
          router.push('/');
        },
        onError: (error: any) => {
          console.error('Login failed:', error);
          showToast('error', '로그인 실패', '비밀번호를 확인해 주세요.');
        },
      }
    );
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex justify-center items-center w-[300px] sm:w-[400px] mt-[10px] sm:mt-[70px] mb-[70px] sm:mb-[90px]">
          <Link href="/">
            <LargeLogoIcon className="cursor-pointer" />
          </Link>
        </div>
        <div className="p-4 sm:p-8 w-[350px] sm:w-[500px]">
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <InputForm
                id="email"
                placeholder="아이디"
                className="input-autocomplete w-full h-12 bg-transparent border-0 border-b-[1.5px] border-gray1 rounded-none pl-0"
                errorMessage={methods.formState.errors.email?.message}
                type="email"
                {...registerList.email}
                name="email"
              />
              {methods.watch('email') && (
                <button
                  type="button"
                  onClick={() => methods.setValue('email', '')}
                  aria-label="Clear email input"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            <div className="relative">
              <InputForm
                id="password"
                placeholder="비밀번호"
                className="input-autocomplete w-full h-12 bg-transparent border-0 border-b-[1.5px] border-gray1 rounded-none pl-0"
                errorMessage={methods.formState.errors.password?.message}
                type="password"
                {...registerList.password}
                name="password"
              />
              {methods.watch('password') && (
                <button
                  type="button"
                  onClick={() => methods.setValue('password', '')}
                  aria-label="Clear password input"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center mt-3 mb-3">
                <button type="button" onClick={toggleRememberMe} aria-pressed={rememberMe} className="cursor-pointer">
                  {rememberMe ? <CheckTrue className="w-[18px] h-[18px]" /> : <CheckNone className="w-[18px] h-[18px]" />}
                </button>
                <button
                  type="button"
                  onClick={toggleRememberMe}
                  className="flex ml-3 mt-[2.5px] block text-base text-gray1 text-center cursor-pointer"
                >
                  로그인 상태 유지
                </button>
              </div>
            </div>
            <Button type="submit" color="primary" className="w-full h-12">
              로그인
            </Button>
          </form>
          <div className="flex flex-col space-y-4 mt-6">
            <div className="relative flex items-center justify-center mt-[60px] mb-[60px]">
              <div className="flex-grow border-0 border-b-[1px] border-[#443f3f]" />
              <span className="mx-2 text-gray1 text-[12px] font-semibold">또는</span>
              <div className="flex-grow border-0 border-b-[1px] border-[#443f3f]" />
            </div>
            <button
              type="button"
              onClick={() => onOAuthLogin('kakao')}
              className="flex items-center justify-center w-full h-12 rounded-lg bg-[#ffe600] font-semibold	text-[14px]"
            >
              <KaKaoIcon className="w-6 h-6 mr-2" />
              <span className="text-gray-600">카카오 로그인</span>
            </button>
            <button
              type="button"
              onClick={() => onOAuthLogin('google')}
              className="flex items-center justify-center w-full h-12 rounded-lg bg-white font-semibold text-[14px]"
            >
              <GoogleIcon className="w-6 h-6 mr-2" />
              <span className="text-gray-600">구글 로그인</span>
            </button>
          </div>
          <div className="flex justify-center mt-8">
            <p className="text-gray1 text-center font-semibold text-[14px]">
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
        </div>
      </div>
    </FormProvider>
  );
}
