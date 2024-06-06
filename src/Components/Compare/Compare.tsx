'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { DropdownSearch, Option } from '../Commons/Dropdown/DropdownComponent';
import Button from '../Commons/Button';
import { useCustomParam } from '@/Hooks/useCustomParams';
import CompareTable from './CompareTable';
import { Compare } from '@/Types/CompareType';

/**
 * @type compareFirst 비교하기 첫번째 상품
 * @type compareSecond 비교하기 두번째 상품
 */
interface Props {
  compareFirst?: Compare;
  compareSecond?: Compare;
}

/**
 * 두개 상품의 각 비교대상을 점수제로 비교하기 위한 함수
 * @param a 숫자 비교를 위한 첫번째 상품의 비교대상
 * @param b 숫자 비교를 위한 두번쨰 상품의 비교대상
 * @returns 이기면 1 지면 -1 비기면 0 점수 획득
 */
function compareNumber(a: number, b: number) {
  if (a === b) {
    return 0;
  }
  if (a > b) {
    return 1;
  }
  return -1;
}

/**
 * 비교대상의 상품을 담기위해 State 사용
 * 페이지 이동시에도 비교상품을 가지기 위해 localStorage 사용
 * Server Component 사용을 위해 상품id를 전달하기 위한 search param 사용
 */

function CompareComponent({ compareFirst, compareSecond }: Props) {
  // search param 사용하기 위한 custom hook
  // server component에 데이터 전달을 위해 query string 활용
  const params = useCustomParam();

  // 선택한 상품내용을 담기 위한 state
  const [selectOption1, setSelectOption1] = useState<string>('');
  const [selectOption2, setSelectOption2] = useState<string>('');

  useEffect(() => {
    // SSR 방식으로 localStorage 접근 시 오류 발생
    // window 객체를 직접 호출하면 오류 발생
    // 두 상황을 타개하기 위해 useMemo를 쓰지 않고 state, effect 활용 -> 랜더된 후 localStroage 접근
    setSelectOption1(localStorage.getItem('compare1') ?? '');
    setSelectOption2(localStorage.getItem('compare2') ?? '');
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

  // 상품의 비교대상(별점, 리뷰, 찜)을 계산하여 점수 확인
  // 양수일 경우 첫번째 상품 승, 음수일 경우 두번째 상품 승, 0점 무승부
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
                localStorage.setItem('compare1', value);
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
                localStorage.setItem('compare2', value);
                params.reset();
              }}
              type="tag_second"
            />
          </div>
          <Button
            color="primary"
            className="w-[12.5rem] py-6 px-16 font-base font-normal leading-[normal]"
            disabled={!(selectOption1 && selectOption2)}
            onClick={() => {
              if (selectOption1 && selectOption2) {
                params.set('compare1', selectOption1).set('compare2', selectOption2).push();
              }
            }}
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
                      <p className="text-[#05D58B]">{option.find((e) => e.value === params.get('compare1'))?.label}</p>
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
                      <p className="text-[#FF2F9F]">{option.find((e) => e.value === params.get('compare2'))?.label}</p>
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
