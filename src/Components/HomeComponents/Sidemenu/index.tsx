import React, { useState } from 'react';

import { categories } from '@/Constant/Categories';

interface SidemenuProps {
  onSelectCategory: (category: number | null) => void;
}

export default function Sidemenu({ onSelectCategory }: SidemenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = (category: number) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      onSelectCategory(null);
    } else {
      setSelectedCategory(category);
      onSelectCategory(category);
    }
  };

  return (
    <div className="hidden px-[20px] w-[150px] md:flex md:flex-col">
      <p className="text-[16px] text-white mb-[32px]">카테고리</p>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-[32px] text-gray1">
            <button type="button" onClick={() => handleCategoryClick(category.id)} className="text-left">
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
