import classNames from 'classnames';
import React, { forwardRef, useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import InputContainer from '@/Components/Commons/Input/InputContainer';
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
      register,
      ...rest
    }: InputFormProps,
    ref
  ) => {
    const [backgroundImage, setBackgroundImage] = useState<string | null>(backgroundImageUrl || null);
    const [inputId, setInputId] = useState<string | null>(null);

    useEffect(() => {
      setInputId(label || `file-input-${Math.random().toString(36)}`);
    }, [label]);

    const { onChange: registerOnChange, ...restProps } = rest;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          URL.revokeObjectURL(backgroundImage);
        }
      },
      [backgroundImage]
    );

    const inputFieldContainerClasses = classNames('inset-0 rounded-lg overflow-hidden', className);

    return (
      <InputContainer className={className} label={label} required={required} errorMessage={errorMessage}>
        {inputId && (
          <label
            htmlFor={inputId}
            className="relative cursor-pointer rounded-lg border border-black4 bg-scblack aspect-video hover:border-blue"
          >
            <div
              className={inputFieldContainerClasses}
              style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0,
              }}
            />
            {!backgroundImage && (
              <div className="flex flex-col items-center gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 ml-[5px] mt-[2px]">
                <ImageIconSvg className="w-8 h-8" />
              </div>
            )}
            <input
              className="hidden z-10 w-full h-full opacity-0 cursor-pointer"
              id={inputId}
              type="file"
              accept="image/*"
              ref={ref as React.Ref<HTMLInputElement>}
              onChange={handleFileChange}
              {...restProps}
            />
          </label>
        )}
      </InputContainer>
    );
  }
);

export default FileInputForm;