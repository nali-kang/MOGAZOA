'use client';

import { ReactNode } from 'react';

interface TertiaryButtonProps {
  children: ReactNode;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  btnSize: 'btn-640' | 'btn-540' | 'btn-420' | 'btn-345' | 'btn-200' | 'btn-185';
  // PC 사이즈 기준 width에 맞는 사이즈 불러오시면 됩니다!
}
export default function TertiaryButton({ children, handleClick, isDisabled = false, btnSize }: TertiaryButtonProps) {
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        className={`flex justify-center px-24 py-288 items-center rounded-lg bg-transparent border ${isDisabled ? 'text-gray1 border-black3' : 'text-gray2 border-gray2'} ${btnSize}`}
      >
        {children}
      </button>
    </div>
  );
}
