'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Button from '@/Components/Commons/Button';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import { IFormInput, defaultLoginFormValues, validate } from '@/Constant/AuthForm.type';
import AuthService from '@/Apis/Auth/Auth.service';
import { ReactComponent as CloseIcon } from '@/public/Icons/close-icon.svg';
import { ReactComponent as LargeLogoIcon } from '@/public/icons/large-logo-icon.svg';

const MySwal = withReactContent(Swal);

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
    }, 3000); // 3초 후에 로그인 페이지로 리디렉션
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
              className="w-[400px] h-[55px]"
              basicMessage="이메일 형식을 지켜주세요"
              errorMessage={errors.email?.message}
              type="email"
              {...registerList.email}
              name="email"
              id="email"
            />
          </div>
          <div>
            <InputForm
              label="닉네임"
              className="w-[400px] h-[55px]"
              basicMessage="최대 10글자 가능"
              errorMessage={errors.nickname?.message}
              type="text"
              {...registerList.nickname}
              name="nickname"
              id="nickname"
            />
          </div>
          <div>
            <InputForm
              label="비밀번호"
              className="w-[400px] h-[55px]"
              basicMessage="최소 8글자"
              errorMessage={errors.password?.message}
              type="password"
              {...registerList.password}
              name="password"
              id="password"
            />
          </div>
          <div>
            <InputForm
              label="비밀번호 확인"
              className="w-[400px] h-[55px]"
              errorMessage={errors.passwordConfirm?.message}
              type="password"
              {...passwordConfirmRegister}
              id='passwordConfirm'
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
  );
}
