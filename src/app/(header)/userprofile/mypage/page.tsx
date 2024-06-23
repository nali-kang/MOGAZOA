'use client';

import React, { useState } from 'react';
import UserActivityLogCard from '@/Components/Commons/Cards/UserActivityLogCard/UserActivityLogCard';
import ProductsCategory from '@/Components/Commons/Cards/ProductCard/ProductCategory';
import { useGetUserMe } from '@/Apis/User/useUserService';
import UserProfileCardLoggedIn from '@/Components/Commons/Cards/UserprofileCard/UserProfileCardLoggedIn';
import FloatingButton from '@/Components/Commons/Button/FloatingButton';

function UserMeProfilePage() {
  const [selectProduct, setSelectProduct] = useState<'review' | 'created' | 'favorite'>('review');

  const userMeInfo = useGetUserMe();
  const Id = userMeInfo.data.id;

  return (
    <div className="desktop:grid desktop:grid-row-2 desktop:auto-rows-auto   justify-center desktop:grid-flow-col desktop:mx-[7.3125rem] desktop:mt-[3.75rem]">
      <div className="desktop:row-span-2 desktop:row-auto">
        <UserProfileCardLoggedIn id={Id} />
      </div>
      <div className="desktop:row-span-1 desktop:row-auto">
        <UserActivityLogCard id={Id} />
      </div>
      <div className="flex justify-center mt-[61.5px] md:mt-[60.5px] desktop:mt-[80px] desktop:row-auto">
        <div className="flex flex-col w-[20.9375rem] md:w-[31.8125rem] desktop:w-[58.75rem] gap-[31.5px] desktop:ml-[60px] ">
          <div className="flex gap-[20px] desktop:gap-[40px]">
            <button
              type="button"
              className={`cursor-pointer ${selectProduct === 'review' ? "font-['Pretendard'] text-[18px] desktop:text-[20px] text-white font-semibold" : "font-['Pretendard'] text-[18px] desktop:text-[20px] text-gray1 font-semi"}`}
              onClick={() => setSelectProduct('review')}
            >
              리뷰남긴 상품
            </button>
            <button
              type="button"
              className={`cursor-pointer ${selectProduct === 'created' ? "font-['Pretendard'] text-[18px] desktop:text-[20px] text-white font-semibold" : "font-['Pretendard'] text-[18px] desktop:text-[20px] text-gray1 font-semi"}`}
              onClick={() => setSelectProduct('created')}
            >
              등록한 상품
            </button>
            <button
              type="button"
              className={`cursor-pointer ${selectProduct === 'favorite' ? "font-['Pretendard'] text-[18px] desktop:text-[20px] text-white font-semibold" : "font-['Pretendard'] text-[18px] desktop:text-[20px] text-gray1 font-semi"}`}
              onClick={() => setSelectProduct('favorite')}
            >
              찜한 상품
            </button>
          </div>
          <ProductsCategory category={selectProduct} id={Id} />
        </div>
      </div>
      <FloatingButton />
    </div>
  );
}
export default UserMeProfilePage;
