'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Dropdown, Option } from '../Commons/Dropdown/DropdownComponent';

export default function ProductReview() {
  const [sorting, setSorting] = useState<'latest' | 'upstar' | 'downstar' | 'like'>('latest');

  const sort: Option[] = [
    { label: '최신순', value: 'latest' },
    { label: '별점 높은순', value: 'upstar' },
    { label: '별점 낮은순', value: 'downstar' },
    { label: '좋아요순', value: 'like' },
  ];

  return (
    <div className="flex-col ">
      <div className="w-[375px] md:w-[726px] xl:w-[980px] flex justify-between items-center mb-7">
        <div className=" font-semibold text-lg px-5 xl:text-2xl w-30 h-auto">상품 리뷰</div>
        <Dropdown
          option={sort}
          value={sorting}
          onChange={(value: any) => {
            setSorting(value);
          }}
          type="sort"
        />
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
