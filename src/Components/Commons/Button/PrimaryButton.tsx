'use client';

import { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  btnSize: 'btn-640' | 'btn-540' | 'btn-420' | 'btn-345' | 'btn-200' | 'btn-185';
  // PC 사이즈 기준 width에 맞는 사이즈 불러오시면 됩니다!
}

export default function PrimaryButton({ children, handleClick, isDisabled = false, btnSize }: PrimaryButtonProps) {
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        className={`flex justify-center px-24 py-288 items-center rounded-lg  ${isDisabled ? 'bg-black text-gray-500' : 'bg-gradient text-white'} ${btnSize}`}
      >
        {children}
      </button>
    </div>
  );
}
