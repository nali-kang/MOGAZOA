'use client';

import { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  btnSize: 'btn-640' | 'btn-540' | 'btn-420' | 'btn-345' | 'btn-200' | 'btn-185';
  // PC 사이즈 기준 width에 맞는 사이즈 불러오시면 됩니다!
}
// width height font-size 순서
// pc / tablet / mobile 순서
// 640 65 18/ 440 55 16 / 335 50 16
// 540 65 18/ 510 55 16/ 295 50 16
// 420 65 18/ 420 55 16/ 295 50 16
// 345 65 18/ 246 55 16 / 335 50 16
// 200 70 18/ 164 55 16/ 335 50 16
// 185 65 18 / 140 55 16/ 335 50 16
export default function PrimaryButton({ children, handleClick, isDisabled = false, btnSize }: PrimaryButtonProps) {
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        className={`flex justify-center px-24 py-288 items-center rounded-lg ${btnSize} ${isDisabled ? 'bg-black3 text-gray1' : 'bg-gradient text-white'} `}
      >
        {children}
      </button>
    </div>
  );
}
