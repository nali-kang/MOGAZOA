'use client';

import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

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
  register?: UseFormRegisterReturn;
  maxLength?: number;
  // eslint-disable-next-line no-unused-vars
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
    ref
  ) => {
    // const [inputValue, setInputValue] = useState('');
    const { register, ...restProps } = rest;

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //   const { value } = event.target;
    //   if (value.length <= maxLength) {
    //     setInputValue(value);
    //   }
    // };

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
        {...register}
        {...register}
      >
        <div className={classes.inputFieldContainer}>
          <Input
            className={className}
            id={label}
            textarea={textarea}
            rows={rows}
            maxLength={maxLength}
            invalid={!!errorMessage}
            ref={ref as React.Ref<HTMLInputElement>}
            // onChange={handleInputChange}
            {...register}
            {...restProps}
          />
          {/* {textarea && (
            <div
              className="text-gray1 text-sm font-normal absolute text-black right-[23px] bottom-[20px]"
            >
              {inputValue.length} / {maxLength}
            </div>
          )} */}
        </div>
      </InputContainer>
    );
  }
);

export default InputForm;
