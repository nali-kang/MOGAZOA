/* eslint-disable no-nested-ternary */

'use client';

import { useContext, useState } from 'react';

import FloatingButton from '@/Components/Commons/Button/FloatingButton';
import { Dropdown, Option } from '@/Components/Commons/Dropdown/DropdownComponent';
import ProductsCategory from '@/Components/HomeComponents/Products/ProductsCategory';
import ReviewRank from '@/Components/HomeComponents/ReviewRank';
import Sidemenu from '@/Components/HomeComponents/Sidemenu';
import { categories } from '@/Constant/Categories';
import SearchContext from '../SearchContext';
import { useCategory } from '../CategoryContext';

export default function Home() {
  // const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sorting, setSorting] = useState<'latest' | 'upstar' | 'downstar' | 'like'>('latest');
  const { searchValue } = useContext(SearchContext);
  const { selectedCategory, setSelectedCategory } = useCategory();
  const sort: Option[] = [
    { label: '최신순', value: 'latest' },
    { label: '별점 높은순', value: 'upstar' },
    { label: '별점 낮은순', value: 'downstar' },
    { label: '좋아요순', value: 'like' },
  ];

  return (
    <div>
      <div className="flex flex-col justify-center px-[20px] pt-[30px] gap-[25px] lg:gap-[30px] md:pt-[40px] md:flex-row lg:w-full lg:pt-[60px] lg:px-[100px] lg:grid lg:grid-cols-10">
        <div className="col-span-3">
          <Sidemenu onSelectCategory={setSelectedCategory} />
        </div>
        <div className="flex flex-col md-lg:col-span-5 lg:col-span-4 lg:gap-[60px]">
          <div className="lg:grid lg:grid-col-3">
            <div className="lg:hidden">
              <ReviewRank />
            </div>
            <div className="w-full lg:col-span-2">
              {selectedCategory === null && !searchValue ? (
                <div>
                  <div className="mb-[60px] lg:mb-[80px]">
                    <h1 className="text-white text-[20px] font-semibold leading-7 mb-[30px] lg:text-[24px] lg:leading-none ">
                      지금 핫한 상품
                      <span className="bg-gradient-to-r from-blue to-indigo text-transparent bg-clip-text">TOP 6</span>
                    </h1>
                    <ProductsCategory order="recent" />
                  </div>
                  <div>
                    <h1 className="text-white text-[20px] font-semibold leading-7 mb-[30px] lg:text-[24px] lg:leading-none ">
                      별점이 높은 상품
                    </h1>
                    <ProductsCategory order="rating" />
                  </div>
                </div>
              ) : selectedCategory !== null && !searchValue ? (
                <div className="">
                  <div className="flex justify-between">
                    <h1 className="text-white text-[20px] font-semibold leading-7 mb-[30px] lg:text-[24px] lg:leading-none ">
                      {categories.find((category) => category.id === selectedCategory)?.name}의 모든상품
                    </h1>
                    <Dropdown option={sort} value={sorting} onChange={(value: any) => setSorting(value)} type="sort" />
                  </div>
                  <ProductsCategory category={selectedCategory} sortingOption={sorting} />
                </div>
              ) : searchValue && selectedCategory === null ? (
                <div className="">
                  <div className="flex justify-between">
                    <h1 className="text-white text-[20px] font-semibold leading-7 mb-[30px] lg:text-[24px] lg:leading-none ">
                      &quot;{searchValue}&quot;로 검색한 상품
                    </h1>
                    <Dropdown option={sort} value={sorting} onChange={(value: any) => setSorting(value)} type="sort" />
                  </div>
                  <ProductsCategory searchValue={searchValue} sortingOption={sorting} />
                </div>
              ) : searchValue && selectedCategory !== null ? (
                <div className="">
                  <div className="flex justify-between">
                    <h1 className="text-white text-[20px] font-semibold leading-7 mb-[30px] lg:text-[24px] lg:leading-none ">
                      {categories.find((category) => category.id === selectedCategory)?.name}의 &quot;{searchValue}
                      &quot;로 검색한 상품
                    </h1>
                    <Dropdown option={sort} value={sorting} onChange={(value: any) => setSorting(value)} type="sort" />
                  </div>
                  <ProductsCategory category={selectedCategory} searchValue={searchValue} sortingOption={sorting} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-2">
          <ReviewRank />
        </div>
      </div>
      <FloatingButton />
    </div>
  );
}
