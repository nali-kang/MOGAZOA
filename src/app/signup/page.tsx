'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import NavigationBar from '@/Components/NavigationBar/Navigationbar';
import Button from '@/Components/Commons/Button';
import InputForm from '@/Components/Commons/Input/InputForm/InputForm';
import { IFormInput, defaultLoginFormValues, validate } from '@/Constant/AuthForm.type';

export default function SignUpPage() {
  const {
    // handleSubmit,
    register,
    watch,
    formState: { errors /* isValid */ },
  } = useForm<IFormInput>({ defaultValues: defaultLoginFormValues, mode: 'onTouched' });

  //   const password = watch('password');
  //   const passwordConfirm = watch('passwordConfirm');

  // const { mutate: signupMutate } = usePostUser({
  //     email: '',
  //     password: '',
  //     type: 'employee'
  //   });

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

  return (
    <div>
      <NavigationBar firstTitle="로그인" secondTitle="회원가입" />
      <div className="flex justify-center content-center">
        <div className="flex flex-col gap-[35px] pt-[20px]">
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
              basicMessage='최대 10글자 가능'
              errorMessage={errors.nickname?.message}
              type="text"
              {...registerList.email}
              name="email"
            />
          </div>
          <div>
            <InputForm
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              className="w-[335px] h-[55px]"
              basicMessage='최소 8글자'
              errorMessage={errors.password?.message}
              type="password"
              {...registerList.password}
              name="password"
            />
          </div>
          <div>
            {' '}
            <InputForm
              label="비밀번호 확인"
              placeholder="비밀번호를 확인해 주세요"
              className="w-[335px] h-[55px]"
              errorMessage={errors.passwordConfirm?.message}
              type="password"
              {...passwordConfirmRegister}
            />
          </div>
          <Button color="primary" className="w-[335px] h-[50px] mt-[150px] text-[16px]">
            가입하기
          </Button>
        </div>
      </div>
    </div>
  );
}
