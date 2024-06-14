'use client';

import React, { useState } from 'react';
import NavigationBar from '@/Components/Commons/NavigationBar/Navigationbar';
import UserProfileCard from '@/Components/Commons/Cards/UserprofileCard/UserprofileCard';
import UserActivityLogCard from '@/Components/Commons/Cards/UserActivityLogCard/UserActivityLogCard';
import { Dropdown, Option } from '@/Components/Commons/Dropdown/DropdownComponent';
import ProductsCategory from '@/Components/Commons/Cards/ProductCard/ProductCategory';

function UserProfilePage() {
  const [selectProduct, setSelectProduct] = useState<'review' | 'created' | 'favorite'>('review');

  const sort: Option[] = [
    { label: '리뷰남긴 상품', value: 'review' },
    { label: '등록한 상품', value: 'created' },
    { label: '찜한 상품', value: 'favorite' },
  ];
  return (
    <>
      <NavigationBar />
      <div className="xl:grid xl:grid-row-2 xl:auto-rows-auto   justify-center xl:grid-flow-col xl:mx-[7.3125rem] xl:mt-[3.75rem]">
        <div className="xl:row-span-2 xl:row-auto">
          <UserProfileCard />
        </div>
        <div className="xl:row-span-1 xl:row-auto">
          <UserActivityLogCard />
        </div>
        <div className="flex justify-center mt-[61.5px] md:mt-[60.5px] xl:mt-[80px] xl:row-auto">
          <div className="flex flex-col w-[20.9375rem] md:w-[31.8125rem] xl:w-[58.75rem] gap-[31.5px] xl:ml-[60px] ">
            <Dropdown
              option={sort}
              value={selectProduct}
              onChange={(value: any) => setSelectProduct(value)}
              type="sort"
            />
            <ProductsCategory category={selectProduct} />
          </div>
        </div>
      </div>
    </>
  );
}
export default UserProfilePage;
