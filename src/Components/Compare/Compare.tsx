'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { DropdownSearch, Option } from '../Commons/Dropdown/DropdownComponent';
import Button from '../Commons/Button';
import { useCustomParam } from '@/Hooks/useCustomParams';
import CompareTable from './CompareTable';
import { Compare } from '@/Types/CompareType';
import { useInfinityRequest } from '@/Hooks/useInfinityRequest';

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
  const [selectOption1, setSelectOption1] = useState<Option | undefined>();
  const [selectOption2, setSelectOption2] = useState<Option | undefined>();

  // 검색 input value state
  const [search1, setSearch1] = useState<string>('');
  // 검색 input value state
  const [search2, setSearch2] = useState<string>('');

  useEffect(() => {
    // SSR 방식으로 localStorage 접근 시 오류 발생
    // window 객체를 직접 호출하면 오류 발생
    // 두 상황을 타개하기 위해 useMemo를 쓰지 않고 state, effect 활용 -> 랜더된 후 localStroage 접근
    const compareItem = localStorage.getItem('compare') && JSON.parse(localStorage.getItem('compare') ?? '[]');
    setSelectOption1(compareItem?.[0]);
    setSelectOption2(compareItem?.[1]);
  }, []);

  // useEffect(() => {
  //   // value값이 변경될 경우 input값을 해당 option의 label로 변경하여 표출
  //   setSearch(selectOption1?.label ?? '');
  // }, [selectOption1]);

  const {
    data: firstData,
    setTarget: firstTarget,
    refetch: firstRefetch,
  } = useInfinityRequest({
    infinityQueryKey: ['products', search1],
    requestParam: { keyword: search1 ?? '' },
    requestPath: '/products',
    method: 'GET',
  });

  const {
    data: secondData,
    setTarget: secondTarget,
    refetch: secondRefetch,
  } = useInfinityRequest({
    infinityQueryKey: ['products', search2],
    requestParam: { keyword: search2 ?? '', order: undefined },
    requestPath: '/products',
    method: 'GET',
  });

  useEffect(() => {
    firstRefetch();
    secondRefetch();
  }, [search1, search2]);

  const optionFirst: Option[] = useMemo(() => {
    const productOption = firstData?.pages?.map((page: Record<string, any>) => page.data.list).flat();
    return productOption?.map((e: any) => ({ label: e.name, value: e.id })) ?? [];
  }, [firstData]);

  const optionSecond: Option[] = useMemo(() => {
    const productOption = secondData?.pages?.map((page: Record<string, any>) => page.data.list).flat();
    return productOption?.map((e: any) => ({ label: e.name, value: e.id })) ?? [];
  }, [secondData]);

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

  // 우세 점수 비교
  const compareWin = useMemo(() => {
    if (compareFirst && compareSecond) {
      const rating = compareNumber(compareFirst.rating, compareSecond.rating);
      const review = compareNumber(compareFirst.reviewCount, compareSecond.reviewCount);
      const favorite = compareNumber(compareFirst.favoriteCount, compareSecond.favoriteCount);
      if (compareState > 0) {
        return (rating > 0 ? rating : 0) + (review > 0 ? review : 0) + (favorite > 0 ? favorite : 0);
      } else {
        return (rating < 0 ? rating : 0) + (review < 0 ? review : 0) + (favorite < 0 ? favorite : 0);
      }
    }
    return 0;
  }, [compareFirst, compareSecond, params, compareState]);

  const changeDropdownValue = useCallback(
    (value: any, index: number) => {
      const option = index === 1 ? optionSecond : optionFirst;
      const selectValue = value ? { label: option.find((e) => e.value === value)?.label ?? '', value } : undefined;
      if (index === 0) {
        setSelectOption1(selectValue);
        localStorage.setItem('compare', JSON.stringify([selectValue, selectOption2]));
      } else {
        setSelectOption2(selectValue);
        localStorage.setItem('compare', JSON.stringify([selectOption1, selectValue]));
      }
      params.reset();
    },
    [optionFirst, optionSecond, selectOption1, selectOption2]
  );

  return (
    <main className="pt-[1.88rem] md:pt-[2.5rem] lg:pt-[3.75rem]">
      <section className="mx-auto flex flex-col w-fit">
        <article className="flex-col md:flex-row flex gap-[1.88rem] md:gap-5 items-end">
          <div className="flex flex-col gap-[0.62rem]">
            <strong className='text-[#F1F1F5] font-["Pretendard"] text-sm lg:text-base font-normal leading-[normal]'>
              상품1
            </strong>
            <DropdownSearch
              option={optionFirst}
              value={selectOption1}
              onChange={(value: any) => changeDropdownValue(value, 0)}
              type="tag_first"
              target={firstTarget}
              search={search1}
              setSearch={setSearch1}
            />
          </div>
          <div className="flex flex-col gap-[0.62rem]">
            <strong className='text-[#F1F1F5] font-["Pretendard"] text-sm lg:text-base font-normal leading-[normal]'>
              상품2
            </strong>
            <DropdownSearch
              option={optionSecond}
              value={selectOption2}
              onChange={(value: number) => changeDropdownValue(value, 1)}
              type="tag_second"
              target={secondTarget}
              search={search2}
              setSearch={setSearch2}
            />
          </div>
          <Button
            color="primary"
            className="w-[20.9375rem] md:w-[10.25rem] lg:w-[12.5rem] h-[3.175rem] md:h-[3.4375rem] lg:h-[4.375rem] flex items-center justify-center font-base font-normal leading-[normal] !px-0 !py-0"
            disabled={!(selectOption1?.value && selectOption2?.value)}
            onClick={() => {
              if (selectOption1?.value && selectOption2?.value) {
                params.set('compare1', selectOption1.value).set('compare2', selectOption2.value).push();
              }
            }}
          >
            비교하기
          </Button>
        </article>
        <article className="w-full flex items-center justify-center">
          {params.getData('compare1') && params.getData('compare2') ? (
            <div className="w-full h-[34.25rem] md:h-[51.315rem] pt-[6.25rem] md:pt-[8.75rem] md:pb-[14.75rem] flex flex-col items-center">
              <div className="text-xl lg:text-2xl laeding-[normal] font-semibold text-[#F1F1F5] text-center">
                {compareState > 0 && (
                  <div className="flex flex-col gap-5 items-center">
                    <div>
                      <span className="text-[#05D58B]">{`${selectOption1?.label} `}</span>
                      상품이 <br className="block lg:hidden" />
                      승리하였습니다!
                    </div>
                    <p className="text-xs lg:text-base font-normal leading-normal text-[#9FA6B2]">
                      3가지 항목 중 {Math.abs(compareWin)}가지 항목에서 우세합니다.
                    </p>
                  </div>
                )}
                {compareState < 0 && (
                  <div className="flex flex-col gap-5 items-center">
                    <div>
                      <span className="text-[#FF2F9F]">{`${selectOption2?.label} `}</span>
                      상품이
                      <br className="block lg:hidden" /> 승리하였습니다!
                    </div>
                    <p className="text-xs lg:text-base font-normal leading-normal text-[#9FA6B2]">
                      3가지 항목 중 {Math.abs(compareWin)}가지 항목에서 우세합니다.
                    </p>
                  </div>
                )}
                {compareState === 0 && <span>무승부입니다.</span>}
              </div>
              <CompareTable compareFirst={compareFirst} compareSecond={compareSecond} />
            </div>
          ) : (
            <div className="py-40"></div>
          )}
        </article>
      </section>
    </main>
  );
}

export default CompareComponent;
