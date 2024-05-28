import React from 'react';

interface Category {
  id: number;
  name: string;
}

interface SidemenuProps {
  onSelectCategory: (category: number | 'hot' | 'rating') => void;
}

export default function Sidemenu({ onSelectCategory }: SidemenuProps) {
  const categories: Category[] = [
    { id: 1, name: '음악' },
    { id: 2, name: '영화/드라마' },
    { id: 3, name: '강의/책' },
    { id: 4, name: '호텔' },
    { id: 5, name: '가구/인테리어' },
    { id: 6, name: '식당' },
    { id: 7, name: '전자기기' },
    { id: 8, name: '화장품' },
    { id: 9, name: '의류/악세서리' },
    { id: 10, name: '앱' },
  ];

  return (
    <div className="hidden px-[20px] py-[30px] min-w-[150px] md:flex md:flex-col">
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
