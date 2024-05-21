"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputForm from '../../Components/Commons/Input/InputForm';

interface FormValues {
  firstName: string;
  lastName: string;
}

function InputPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Input Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputForm
          label="First Name"
          fieldLabel="Required"
          errorMessage={errors.firstName?.message}
          {...register('firstName', { required: 'First name is required' })}
        />

        <InputForm
          label="Last Name"
          fieldLabel="Required"
          errorMessage={errors.lastName?.message}
          {...register('lastName', { required: 'Last name is required' })}
        />

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default InputPage;
