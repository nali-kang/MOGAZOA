'use client';

import FloatingButton from '@/Components/Commons/Button/FloatingButton';
import HotProducts from '@/Components/HomeComponents/Products/HotProducts';
import ReveiwRank from '@/Components/HomeComponents/ReviewRank';

export default function Home() {
  return (
    <div>
      <div className="bg-white w-full h-[70px] md:h-[80px] lg:h-[100px]">header</div>
      <div className="px-[20px] pt-[30px] md:pl-[25px] md:pr-[30px] md:pt-[40px]">
        <ReveiwRank />
        <h1 className="text-white text-[20px] font-semibold leading-7 lg:text-[24px] lg:leading-none">
          지금 핫한 상품{' '}
          <span className="bg-gradient-to-r from-blue to-indigo text-transparent bg-clip-text">TOP 6</span>
        </h1>
        <HotProducts />
      </div>
      <FloatingButton />
    </div>
  );
}
