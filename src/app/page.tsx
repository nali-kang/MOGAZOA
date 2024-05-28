'use client';

import FloatingButton from '@/Components/Commons/Button/FloatingButton';
import ProductsCategory from '@/Components/HomeComponents/Products/ProductsCategory';
import ReveiwRank from '@/Components/HomeComponents/ReviewRank';
import Sidemenu from '@/Components/HomeComponents/Sidemenu';
import NavigationBar from '@/Components/NavigationBar/Navigationbar';
import { useState } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | 'hot' | 'rating'>('hot');

  return (
    <div>
      <NavigationBar firstTitle="비교하기" secondTitle="내 프로필" />
      <div className="flex flex-col justify-normal px-[20px] pt-[30px] gap-[25px] w-full lg:justify-center md:pl-[25px] md:pr-[30px] md:pt-[40px] md:flex-row lg:flex-row">
        <Sidemenu onSelectCategory={setSelectedCategory} />
        <div className="flex flex-col lg:flex-row-reverse lg:gap-[60px]">
          <ReveiwRank />
          <div className="">
            <div className="mb-[60px] lg:mb-[80px]">
              <h1 className="text-white text-[20px] font-semibold leading-7 mb-[30px] lg:text-[24px] lg:leading-none ">
                지금 핫한 상품
                <span className="bg-gradient-to-r from-blue to-indigo text-transparent bg-clip-text">TOP 6</span>
              </h1>
              <ProductsCategory category="hot" />
            </div>
            <div>
              <h1 className="text-white text-[20px] font-semibold leading-7 mb-[30px] lg:text-[24px] lg:leading-none ">
                별점이 높은 상품
              </h1>
              <ProductsCategory category={selectedCategory} />
            </div>
          </div>
        </div>
      </div>
      <FloatingButton />
    </div>
  );
}
