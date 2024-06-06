'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { DropdownSearch, Option } from '../Commons/Dropdown/DropdownComponent';
import Button from '../Commons/Button';
import { useCustomParam } from '@/Hooks/useCustomParams';
import CompareTable from './CompareTable';
import { Compare } from '@/Types/CompareType';

interface Props {
  compareFirst?: Compare;
  compareSecond?: Compare;
}

function compareNumber(a: number, b: number) {
  if (a === b) {
    return 0;
  }
  if (a > b) {
    return 1;
  }
  return -1;
}

function CompareComponent({ compareFirst, compareSecond }: Props) {
  const params = useCustomParam();

  const [selectOption1, setSelectOption1] = useState<string>('');
  const [selectOption2, setSelectOption2] = useState<string>('');

  useEffect(() => {
    setSelectOption1(localStorage.getItem('key1') ?? '');
    setSelectOption2(localStorage.getItem('key2') ?? '');
  }, []);

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

  const compareState = useMemo(() => {
    if (compareFirst && compareSecond) {
      return (
        compareNumber(compareFirst.rating, compareSecond.rating) +
        compareNumber(compareFirst.reviewCount, compareSecond.reviewCount) +
        compareNumber(compareFirst.favoriteCount, compareSecond.favoriteCount)
      );
    }
    return 0;
  }, [compareFirst, compareSecond, params]);

  return (
    <main className="pt-[3.75rem]">
      <section className="mx-auto flex flex-col w-fit">
        <article className="flex gap-5 items-end">
          <div className="flex flex-col gap-[0.62rem]">
            <label className='text-[#F1F1F5] font-["Pretendard"] text-base font-normal leading-[normal]'>상품1</label>
            <DropdownSearch
              option={option}
              value={selectOption1}
              onChange={(value: string) => {
                setSelectOption1(value);
                localStorage.setItem('key1', value);
                params.reset();
              }}
              type="tag_first"
            />
          </div>
          <div className="flex flex-col gap-[0.62rem]">
            <label className='text-[#F1F1F5] font-["Pretendard"] text-base font-normal leading-[normal]'>상품2</label>
            <DropdownSearch
              option={option}
              value={selectOption2}
              onChange={(value: string) => {
                setSelectOption2(value);
                localStorage.setItem('key2', value);
                params.reset();
              }}
              type="tag_second"
            />
          </div>
          <Button
            color="primary"
            className="w-[12.5rem] py-6 px-16 font-base font-normal leading-[normal]"
            onClick={() => params.set('key1', selectOption1).set('key2', selectOption2).push()}
          >
            비교하기
          </Button>
        </article>
        <article className="w-full flex items-center justify-center">
          {compareFirst && compareSecond && selectOption1 && selectOption2 ? (
            <div className="w-full h-[51.315rem] pt-[8.75rem] pb-[14.75rem] flex flex-col items-center">
              <strong className="text-2xl laeding-[normal] font-semibold text-[#F1F1F5]">
                {compareState > 0 && (
                  <div className="flex flex-col gap-5 items-center">
                    <span className="flex gap-2">
                      <p className="text-[#05D58B]">{option.find((e) => e.value === params.get('key1'))?.label}</p>
                      상품이 승리하였습니다!
                    </span>
                    <p className="text-base font-normal leading-normal text-[#9FA6B2]">
                      3가지 항목 중 {Math.abs(compareState) + 1}가지 항목에서 우세합니다.
                    </p>
                  </div>
                )}
                {compareState < 0 && (
                  <div className="flex flex-col gap-5 items-center">
                    <span className="flex gap-2">
                      <p className="text-[#FF2F9F]">{option.find((e) => e.value === params.get('key2'))?.label}</p>
                      상품이 승리하였습니다!
                    </span>
                    <p className="text-base font-normal leading-normal text-[#9FA6B2]">
                      3가지 항목 중 {Math.abs(compareState) + 1}가지 항목에서 우세합니다.
                    </p>
                  </div>
                )}
                {compareState === 0 && <span>무승부입니다.</span>}
              </strong>
              <CompareTable compareFirst={compareFirst} compareSecond={compareSecond} />
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
