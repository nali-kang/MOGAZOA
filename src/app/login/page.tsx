'use client';

import React, { useEffect, useState, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useSession, signIn as nextAuthSignIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { usePostAuthSignIn } from '@/Apis/Auth/useAuthService';
import Button from '@/Components/Commons/Button';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import { IFormInput, defaultLoginFormValues, validate } from '@/Constant/AuthForm.type';

import { ReactComponent as KaKaoIcon } from '@/public/Icons/kakao-icon.svg';
import { ReactComponent as GoogleIcon } from '@/public/Icons/google-icon.svg';
import { ReactComponent as CloseIcon } from '@/public/Icons/close-icon.svg';
import { ReactComponent as LargeLogoIcon } from '@/public/icons/large-logo-icon.svg';
import { ReactComponent as CheckTrue } from '@/public/Icons/checkbox-true.svg';
import { ReactComponent as CheckNone } from '@/public/Icons/checkbox-none.svg';
import Cookies from 'js-cookie';

const MySwal = withReactContent(Swal);

export default function LoginPage() {
  const { data: userSession } = useSession();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const signIn = usePostAuthSignIn({
    email: '',
    password: '',
  });

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
    if (userSession) {
      router.push('/');
    }
  }, [userSession, router]);

  const onKakaoLogin = async () => {
    console.log('onKakaoLogin called');
    try {
      const result = await nextAuthSignIn('kakao', { redirect: false, callbackUrl: `http://localhost:3000/` });
      console.log('Kakao signIn result:', result);

      if (result?.error) {
        console.error('Kakao login failed:', result.error);
        showToast('error', '카카오 로그인 실패', '다시 시도해 주세요.');
      } else {
        const session = await getSession();
        console.log('Current session:', session);

        if (session) {
          const { accessToken } = session;
          console.log('Access Token:', accessToken);

          if (accessToken) {
            // 백엔드에 토큰 요청
            const response = await fetch('https://mogazoa-api.vercel.app/4-18/oauth/kakao', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                redirectUri: 'http://localhost:3000/oauth/kakao',
                token: accessToken,
              }),
            });

            console.log('Token request sent');

            const data = await response.json();
            console.log('Backend token response:', data);

            if (response.ok) {
              const backendToken = data.accessToken;
              console.log('Backend Access Token:', backendToken);
              Cookies.set('token', backendToken, { expires: rememberMe ? 30 : 1 });
              showToast('success', '로그인 되었습니다', '서비스를 이용해 주세요.');
              router.push('/');
            } else {
              console.error('Backend token request failed:', data);
              showToast('error', '토큰 요청 실패', '다시 시도해 주세요.');
            }
          } else {
            console.error('No access token found in session');
            showToast('error', '로그인 실패', '다시 시도해 주세요.');
          }
        }
      }
    } catch (error) {
      console.error('An error occurred during Kakao login:', error);
      showToast('error', '로그인 실패', '다시 시도해 주세요.');
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

  const onSubmit = async (data: IFormInput) => {
    signIn.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: async (result: any) => {
          console.log('Login successful:', result);

          // NextAuth 세션을 업데이트하여 사용자의 인증 상태를 관리
          await nextAuthSignIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
          });

          const token = result?.data?.accessToken;
          if (token) {
            console.log('Token set:', token);
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
                  id="email"
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
                  id="password"
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
              <div className="flex items-center gap-2 mt-[-20px]">
                <button type="button" onClick={toggleRememberMe} aria-pressed={rememberMe} className="cursor-pointer">
                  {rememberMe ? (
                    <CheckTrue className="w-[16px] h-[16px]" />
                  ) : (
                    <CheckNone className="w-[16px] h-[16px]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleRememberMe}
                  className="ml-1 block text-base text-gray1 text-center cursor-pointer mt-[3px]"
                >
                  로그인 상태 유지하기
                </button>
              </div>
            </div>
          </form>
          <div className="flex justify-center mt-[20px]">
            <p className="text-gray1 text-center font-normal text-[14px]">
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
              <p className="text-gray1 font-normal text-[14px] text-center">SNS로 바로 시작하기</p>
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
