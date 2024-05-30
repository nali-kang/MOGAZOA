import React from 'react';

import { categories } from '@/Constant/Categories';

interface SidemenuProps {
  onSelectCategory: (category: number | 'hot' | 'rating') => void;
}

export default function Sidemenu({ onSelectCategory }: SidemenuProps) {
  return (
    <div className="hidden px-[20px] min-w-[150px] md:flex md:flex-col">
      <p className="text-[16px] text-white mb-[32px]">카테고리</p>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-[32px] text-gray1">
            <button type="button" onClick={() => onSelectCategory(category.id)} className="text-left w-full">
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
