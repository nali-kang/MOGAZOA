import classNames from 'classnames';
import React, { forwardRef, useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import InputContainer from '@/components/Commons/Input/InputContainer';
import { ReactComponent as ImageIconSvg } from '@/public/Icons/img-icon.svg';

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string;
  label?: string;
  errorMessage?: string | undefined | null;
  register?: UseFormRegisterReturn;
  backgroundImageUrl?: string;
}

const FileInputForm = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFormProps>(
  (
    {
      className = '',
      label = '',
      errorMessage = '',
      required = false,
      backgroundImageUrl = '',
      ...rest
    }: InputFormProps,
    ref
  ) => {
    const [backgroundImage, setBackgroundImage] = useState<string | null>(backgroundImageUrl || null);

    const { onChange: registerOnChange, ...restProps } = rest;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // register의 onChange를 먼저 호출
      if (registerOnChange) {
        registerOnChange(event);
      }

      const file = event.target.files?.[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        setBackgroundImage(fileURL);
      }
    };

    useEffect(
      () => () => {
        if (backgroundImage) {
          URL.revokeObjectURL(backgroundImage); // 메모리 누수 방지
        }
      },
      [backgroundImage]
    );

    const inputFieldContainerClasses = classNames(
      'relative w-full rounded-lg border border-gray-300 bg-gray-100 aspect-video',
      errorMessage && 'border-red-400',
      className
    );

    return (
      <InputContainer className={className} label={label} required={required} errorMessage={errorMessage}>
        <div
          className={inputFieldContainerClasses}
          style={{
            backgroundImage: backgroundImage
              ? `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`
              : undefined,
            backgroundSize: 'cover',
          }}
        >
          <label
            htmlFor={label}
            className="flex flex-col items-center gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          >
            <ImageIconSvg className="w-8 h-8" />
          </label>
          <input
            className="hidden"
            id={label}
            type="file"
            accept="image/*"
            ref={ref as React.Ref<HTMLInputElement>}
            onChange={handleFileChange}
            {...restProps}
          />
        </div>
      </InputContainer>
    );
  }
);

export default FileInputForm;
