'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProductReview() {
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState('최신순');

  function handleSort(event: any) {
    const value = event.currentTarget.innerText;
    console.log(value);
    // setSort(e.target.value());
    setIsOpen(false);
    setSort(value);
  }

  return (
    <div className="flex-col ">
      <div className="w-[375px] md:w-[726px] xl:w-[980px] flex justify-between items-center">
        <div className=" font-semibold text-lg px-5 xl:text-2xl w-30 h-auto">상품 리뷰</div>
        <button
          type="button"
          className="flex justify-end items-center w-32 h-full rounded-md px-3 py-1 bg-black1 text-sm font-medium text-gray-300"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {sort}
          {isOpen ? (
            <Image alt="화살표 선택" src="/icons/drop-up-icon.svg" width={30} height={30} />
          ) : (
            <Image alt="화살표 선택" src="/icons/drop-down-icon.svg" width={30} height={30} />
          )}
        </button>
      </div>
      <div className="relative inline-block text-left">
        {isOpen && (
          <div className="absolute right-[-365px] top-[-25px] md:right-[-716px] xl:right-[-970px] mt-2 w-50 rounded-md shadow-lg bg-scblack ring-1 ring-black ring-opacity-5">
            <ul className="py-1 rounded-md p-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <li
                onClick={handleSort}
                role="menuitem"
                className="block rounded-md px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-gray-200"
              >
                최신순
              </li>
              <li
                onClick={handleSort}
                role="menuitem"
                className="block px-4  rounded-md py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-gray-200"
              >
                별점 높은순
              </li>
              <li
                onClick={handleSort}
                role="menuitem"
                className="block px-4 py-2  rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-gray-200"
              >
                별점 낮은순
              </li>
              <li
                onClick={handleSort}
                role="menuitem"
                className="block px-4 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-gray-200"
              >
                좋아요순
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="w-[335px] md:w-[684px] xl:w-[940px] bg-scblack rounded-xl border border-zinc-700 justify-center mx-auto p-5 md:flex">
        <div className="w-32 h-9 justify-start items-center gap-2.5 inline-flex md:w-[159px] xl:mr-20">
          <div className="w-9 h-9 relative">
            <div className="w-9 h-9 bg-zinc-300 rounded-full" />
          </div>
          <div className="flex-col justify-start items-start gap-[5px] inline-flex w-40">
            <div className="text-gray-100 text-sm font-normal font-['Pretendard'] w-40 xl:text-base">
              surisuri마수리
            </div>
            <div className="w-[68px] h-3 justify-start items-start gap-0.5 inline-flex">
              {/* TODO: 숫자만큼 반복해서 보여주게 바꾸기 */}
              <Image src="/icons/star-icon.svg" alt="따봉" width={12} height={12} className="xl:w-[18px] xl:h-[18px]" />
              <Image src="/icons/star-icon.svg" alt="따봉" width={12} height={12} className="xl:w-[18px] xl:h-[18px]" />
              <Image src="/icons/star-icon.svg" alt="따봉" width={12} height={12} className="xl:w-[18px] xl:h-[18px]" />
              <Image src="/icons/star-icon.svg" alt="따봉" width={12} height={12} className="xl:w-[18px] xl:h-[18px]" />
              <Image src="/icons/star-icon.svg" alt="따봉" width={12} height={12} className="xl:w-[18px] xl:h-[18px]" />
            </div>
          </div>
        </div>
        <div className="w-full flex-col justify-start items-start gap-5 inline-flex">
          <div className="flex-col justify-start items-start gap-2.5 flex">
            <div className="w-full text-gray-100 xl:text-base text-xs font-normal font-['Pretendard'] leading-snug">
              음질 미칩니다ㅎㅎ 최고예용~ 어플 연동으로 음향 설정 및 설정모드 되고, 설정별로 사운드감이 틀려요 서라운드
              느낌까지 들고, 따로는 베이스깐 우퍼 느낌도 있어요음질 미칩니다ㅎㅎ 최고예용~
            </div>
          </div>
          <div className="justify-start items-start gap-2.5 inline-flex">
            <Image
              src="/images/review-image-1.svg"
              alt="이미지1"
              width={14}
              height={14}
              className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] bg-zinc-300 rounded-lg"
            />
            <Image
              src="/images/review-image-2.svg"
              alt="이미지2"
              width={14}
              height={14}
              className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] bg-zinc-300 rounded-lg"
            />
          </div>
          <div className="w-full justify-between items-end inline-flex">
            <div className="text-gray-500 text-xs font-normal font-['Pretendard']">2024-01-29</div>
            <div className="flex-col justify-start items-start gap-2.5 inline-flex">
              <button
                type="button"
                className="px-2.5 py-1.5 bg-zinc-800 rounded-[100px] border border-zinc-700 justify-center items-center gap-[5px] flex"
              >
                <Image src="/icons/like-icon.svg" alt="따봉" width={14} height={14} className="md:w-5 md:h-5" />
                <div className=" text-xs bg-gradient font-normal font-['Pretendard'] bg-clip-text text-transparent">
                  132
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" mb-20" />
    </div>
  );
}
