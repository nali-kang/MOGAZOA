'use client';

import { useState } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: 'primary' | 'secondary' | 'tertiary';
  variant?: 'disabledBased' | 'clickBased';
}

export default function Button({ children, color, className, variant, ...rest }: ButtonProps) {
  const { disabled, onClick, ...restProps } = rest;

  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (color === 'secondary' && variant === 'clickBased') {
      setClicked(!clicked);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const colorClassName = {
    primary: `${disabled ? 'bg-black3 text-gray1' : 'bg-gradient text-white'}`,
    secondary:
      variant === 'disabledBased'
        ? `border ${disabled ? 'text-gray1 border-black3 bg-transparent' : 'border-blue bg-gradient-to-r from-blue to-indigo text-transparent bg-clip-text'}`
        : `border ${clicked ? 'border-pink text-pink' : 'text-gray1 border-black3'}`,
    tertiary: `bg-transparent border ${disabled ? 'text-gray1 border-black3' : 'text-gray2 border-gray2'}`,
  }[color];

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`flex justify-center px-24 py-288 items-center rounded-lg font-semibold text-[16px] lg:text-[18px] ${colorClassName} ${className}`}
        {...restProps}
      >
        {children}
      </button>
    </div>
  );
}
