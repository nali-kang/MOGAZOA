'use client';

import { useState } from 'react';
import { DropdownSearch, Option } from '../Commons/Dropdown/DropdownComponent';
import Button from '../Commons/Button';
import src from '../../../custom';
import Image from 'next/image';

interface Compare {
  star: number;
  review: number;
  like: number;
}

interface Props {
  compareFirst: Compare;
  compareSecond: Compare;
}

function CompareComponent({ compareFirst, compareSecond }: Props) {
  const [selectOption1, setSelectOption1] = useState<string>('option');
  const [selectOption2, setSelectOption2] = useState<string>('option1');

  const option: Option[] = [
    { label: '옵션1', value: 'option' },
    { label: '옵션2', value: 'option1' },
    { label: '옵션3', value: 'option2' },
    { label: '옵션4', value: 'option3' },
    { label: '옵션5', value: 'option4' },
    { label: '옵션6', value: 'option5' },
    { label: '옵션7', value: 'option6' },
    { label: '옵션8', value: 'option7' },
    { label: '옵션9', value: 'option8' },
    { label: '옵션10', value: 'option9' },
  ];

  return (
    <main className="pt-[3.75rem]">
      <section className="mx-auto flex flex-col w-fit">
        <article className="flex gap-5 items-end">
          <div className="flex flex-col gap-[0.62rem]">
            <label className='text-[#F1F1F5] font-["Pretendard"] text-base font-normal leading-[normal]'>상품1</label>
            <DropdownSearch
              option={option}
              value={selectOption1}
              onChange={(value: any) => {
                setSelectOption1(value);
              }}
              type="tag_first"
            />
          </div>
          <div className="flex flex-col gap-[0.62rem]">
            <label className='text-[#F1F1F5] font-["Pretendard"] text-base font-normal leading-[normal]'>상품2</label>
            <DropdownSearch
              option={option}
              value={selectOption2}
              onChange={(value: any) => {
                setSelectOption2(value);
              }}
              type="tag_second"
            />
          </div>
          <Button color="primary" className="w-[12.5rem] py-6 px-16 font-base font-normal leading-[normal]">
            비교하기
          </Button>
        </article>
        <article className="h-full flex items-center justify-center">
          {compareFirst && compareSecond ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : (
            <div className="py-40">
              <Image src="/Icons/large-loading-icon.svg" alt="loading_icon" width={87} height={84} />
            </div>
          )}
        </article>
      </section>
    </main>
  );
}

export default CompareComponent;
