'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FileInputForm from '@/Components/Commons/Input/FileInputForm/FileInputForm';
import InputForm from '../../Components/Commons/Input/InputForm';

interface FormValues {
  firstName: string;
  lastName: string;
  file: FileList;

}

function InputPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="p-4 bg-black1 min-h-screen text-white">
      <h1 className="text-2xl mb-4">Input Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputForm
          label="이메일"
          errorMessage={errors.firstName?.message}
          {...register('firstName', { required: 'First name is required' })}
        />

        <InputForm
          label="비밀번호"
          errorMessage={errors.lastName?.message}
          {...register('lastName', { required: 'Last name is required' })}
        />
      </form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FileInputForm
          className="my-4"
          label="file"
          errorMessage={errors.file ? 'File is required' : undefined}
          register={register('file', { required: true })}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default InputPage;
