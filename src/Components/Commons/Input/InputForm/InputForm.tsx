'use client';

import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

import Input from '@/Components/Commons/Input/Input';
import InputContainer from '@/Components/Commons/Input/InputContainer';

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string;
  label?: string;
  fieldLabel?: string;
  errorMessage?: string | undefined | null;
  basicMessage?: string | undefined | null;
  textarea?: boolean;
  rows?: number;
  register?: any; // UseFormRegisterReturn를 사용하지 않고 any로 설정
  maxLength?: number;
  formatter?: (value: string) => string;
}

const InputForm = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFormProps>(
  (
    {
      className = '',
      label = '',
      fieldLabel = '',
      errorMessage = '',
      basicMessage = '',
      textarea = false,
      rows = 5,
      required = false,
      maxLength = 300,
      ...rest
    }: InputFormProps,
  ) => {
    const { register, watch } = useFormContext();
    const watchValue = watch(rest.name as string, '');

    const classes = {
      inputFieldContainer: classNames('relative'),
      inputField: classNames(fieldLabel),
    };

    const basicMessageOutput = errorMessage ? null : basicMessage;

    return (
      <InputContainer
        className={className}
        label={label}
        required={required}
        basicMessage={basicMessageOutput}
        errorMessage={errorMessage}
      >
        <div className={classes.inputFieldContainer}>
          <Input
            className={className}
            id={label}
            textarea={textarea}
            rows={rows}
            maxLength={maxLength}
            invalid={!!errorMessage}
            {...register(rest.name as string)}
            {...rest}
          />
          {textarea && (
            <div className="text-gray1 text-sm font-normal absolute text-black right-[23px] bottom-[20px]">
              {watchValue.length} / {maxLength}
            </div>
          )}
        </div>
      </InputContainer>
    );
  }
);

export default InputForm;
