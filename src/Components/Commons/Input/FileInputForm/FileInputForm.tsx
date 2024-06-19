import classNames from 'classnames';
import React, { forwardRef, useEffect, useState } from 'react';
import axios from 'axios';
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
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
      setInputId(label || `file-input-${Math.random().toString(36).substr(2, 9)}`);
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
        setSelectedFile(file); // 파일을 선택 상태로 설정
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

    const handleUpload = async () => {
      if (!selectedFile) {
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('teamId', 'YOUR_TEAM_ID'); // 여기에 teamId를 추가합니다.

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/YOUR_TEAM_ID/images/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('이미지 업로드 성공:', response.data);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    };

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
        <button type="button" onClick={handleUpload} className="mt-2 p-2 bg-blue-500 text-white rounded">
          업로드
        </button>
      </InputContainer>
    );
  }
);

export default FileInputForm;
