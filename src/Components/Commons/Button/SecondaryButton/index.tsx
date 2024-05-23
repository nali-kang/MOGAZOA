'use client';

import { ButtonProps } from '@/Types/ButtonProps';
import { useState } from 'react';

const btnSizeClassnames: Record<ButtonProps['btnSize'], string> = {
  'btn-640': 'w-[335px] h-[50px] md:w-[440px] md:h-[55px] lg:w-[640px] lg:h-[65px] text-base lg:text-lg',
  'btn-540': 'w-[295px] h-[50px] md:w-[510px] md:h-[55px] lg:w-[540px] lg:h-[65px] text-base lg:text-lg',
  'btn-420': 'w-[295px] h-[50px] md:w-[420px] md:h-[55px] lg:w-[420px] lg:h-[65px] text-base lg:text-lg',
  'btn-345': 'w-[335px] h-[50px] md:w-[246px] md:h-[55px] lg:w-[345px] lg:h-[65px] text-base lg:text-lg',
  'btn-200': 'w-[335px] h-[50px] md:w-[164px] md:h-[55px] lg:w-[200px] lg:h-[70px] text-base lg:text-lg',
  'btn-185': 'w-[335px] h-[50px] md:w-[140px] md:h-[55px] lg:w-[185px] lg:h-[65px] text-base lg:text-lg',
};

interface SecondaryButtonProps extends ButtonProps {
  btnRole: 'submit' | 'choose';
  // 일반 버튼 submit, 비교 시 사용하는 버튼 choose
}

export default function SecondaryButton({
  children,
  handleClick,
  isDisabled = false,
  btnSize,
  btnRole,
}: SecondaryButtonProps) {
  const [isBtnActive, setIsBtnActive] = useState(false);

  const sizeClass = btnSizeClassnames[btnSize];

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsBtnActive(!isBtnActive);
    handleClick(e);
    console.log(isBtnActive);
  };

  if (btnRole === 'submit') {
    return (
      <div>
        <button
          type="button"
          onClick={handleClick}
          disabled={isDisabled}
          className={`flex justify-center px-24 py-288 items-center rounded-lg bg-transparent  border ${isDisabled ? 'text-gray1 border-black3' : 'border-blue'} ${sizeClass}`}
        >
          <p
            className={`${isDisabled ? 'text-gray1' : 'bg-gradient-to-r from-blue to-indigo text-transparent bg-clip-text'}`}
          >
            {children}
          </p>
        </button>
      </div>
    );
  }
  return (
    <div>
      <button
        type="button"
        onClick={handleButtonClick}
        className={`flex justify-center px-24 py-288 items-center rounded-lg bg-transparent  border ${isBtnActive ? 'border-pink' : 'text-gray1 border-black3'} ${sizeClass}`}
      >
        <p className={`${isBtnActive ? 'text-pink' : 'text-gray1'}`}>{children}</p>
      </button>
    </div>
  );
}
