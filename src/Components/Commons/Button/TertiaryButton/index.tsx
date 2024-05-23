'use client';

import { ButtonProps } from '@/Types/ButtonProps';

const btnSizeClassnames: Record<ButtonProps['btnSize'], string> = {
  'btn-640': 'w-[335px] h-[50px] md:w-[440px] md:h-[55px] lg:w-[640px] lg:h-[65px] text-base lg:text-lg',
  'btn-540': 'w-[295px] h-[50px] md:w-[510px] md:h-[55px] lg:w-[540px] lg:h-[65px] text-base lg:text-lg',
  'btn-420': 'w-[295px] h-[50px] md:w-[420px] md:h-[55px] lg:w-[420px] lg:h-[65px] text-base lg:text-lg',
  'btn-345': 'w-[335px] h-[50px] md:w-[246px] md:h-[55px] lg:w-[345px] lg:h-[65px] text-base lg:text-lg',
  'btn-200': 'w-[335px] h-[50px] md:w-[164px] md:h-[55px] lg:w-[200px] lg:h-[70px] text-base lg:text-lg',
  'btn-185': 'w-[335px] h-[50px] md:w-[140px] md:h-[55px] lg:w-[185px] lg:h-[65px] text-base lg:text-lg',
};

export default function TertiaryButton({ children, handleClick, isDisabled = false, btnSize }: ButtonProps) {
  const sizeClass = btnSizeClassnames[btnSize];

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        className={`flex justify-center px-24 py-288 items-center rounded-lg bg-transparent border ${isDisabled ? 'text-gray1 border-black3' : 'text-gray2 border-gray2'} ${sizeClass}`}
      >
        {children}
      </button>
    </div>
  );
}
