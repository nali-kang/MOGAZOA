'use client';

import React, { useEffect, useState } from 'react';
import UserActivityLogCard from '@/Components/Commons/Cards/UserActivityLogCard/UserActivityLogCard';
import ProductsCategory from '@/Components/Commons/Cards/ProductCard/ProductCategory';
import UserProfileCardLoggedIn from '@/Components/Commons/Cards/UserprofileCard/UserProfileCardLoggedIn';
import Cookies from 'js-cookie';
import UserProfileCardLoggedOut from '@/Components/Commons/Cards/UserprofileCard/UserProfileCardLoggedOut';
import FloatingButton from '@/Components/Commons/Button/FloatingButton';

function UserProfilePage(props: { params: { userprofileId: any } }) {
  const [selectProduct, setSelectProduct] = useState<'review' | 'created' | 'favorite'>('review');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [token, setIsToken] = useState('');
  const id = props.params.userprofileId;

  useEffect(() => {
    const istoken = Cookies.get('token');
    if (istoken) {
      setIsToken(istoken);
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [token]);

  return (
    <div className="desktop:grid desktop:grid-row-2 desktop:auto-rows-auto   justify-center desktop:grid-flow-col desktop:mx-[7.3125rem] desktop:mt-[3.75rem]">
      <div className="desktop:row-span-2 desktop:row-auto">
        {isAuthorized ? <UserProfileCardLoggedIn id={id} /> : <UserProfileCardLoggedOut id={id} />}
      </div>
      <div className="desktop:row-span-1 desktop:row-auto">
        <UserActivityLogCard id={id} />
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
          <ProductsCategory category={selectProduct} id={id} />
        </div>
      </div>
      <FloatingButton />
    </div>
  );
}
export default UserProfilePage;
