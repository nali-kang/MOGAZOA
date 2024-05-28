'use client';

import { RefObject, useEffect, useMemo, useState } from 'react';
import DropdownSelector from '../Icon/DropdownSelector';
import CancelButtonIcon from '../Icon/CancelButtonIcon';
import useDropdown from '@/Hooks/useDropdown';

/**
 * Dropdown Option Type
 */
export interface Option {
  label: string;
  value: any;
}
interface Props {
  option: Option[];
  value: any;
  onChange: (value: any) => void;
}

/**
 * @type option - Dropdown Option List {label: string, value: any}
 * @type value - 해당 Dropdown의 선택된 값 or default value
 * @type onChange - Option List 선택 시 Change Event Handler
 * @type type - search Dropdown Type
 */
interface SearchProps extends Props {
  /**
   * tag_first - 상품비교 페이지 첫번째 태그
   * tag_second - 상품비교 페이지 두번째 태그
   * search(default) - 검색이 가능한 기본 Dropdown
   */
  type?: 'tag_first' | 'tag_second' | 'search';
}

export function DropdownSearch({ option, value, onChange, type = 'search' }: SearchProps) {
  // dropdown hook
  const { btnRef, isOpen, clickHandler } = useDropdown();

  // 검색 input value state
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    // value값이 변경될 경우 input값을 해당 option의 label로 변경하여 표출
    setSearch(option?.find((e) => e.value === value)?.label ?? '');
  }, [value]);

  /**
   * type 별 반응형 (width)
   */
  const widthSize = useMemo(() => {
    switch (type) {
      case 'tag_first':
      case 'tag_second':
        return 'w-[20.9375rem] md:w-[15rem] lg:w-[21.875rem]';
      default:
        return 'w-[18.4375rem] md:w-[22.5rem]';
    }
  }, [type]);

  /**
   * type 별 반응형 (height)
   */
  const heightSize = useMemo(() => {
    switch (type) {
      case 'tag_first':
      case 'tag_second':
        return 'h-[3.4375rem] lg:h-[4.375rem]';
      default:
        return 'h-[3.4375rem] md:h-[3.75rem] lg:h-[4.375rem]';
    }
  }, [type]);

  /**
   * input에 검색한 내용을 filtering 하기 위해 사용
   */
  const optionList = useMemo(() => {
    // 검색 후 뿌려주기 (filter)
    const searchFilter = option.filter((e) => e.label.includes(search));

    return searchFilter.length > 0 ? (
      searchFilter.map((e) => (
        <button
          key={e.value}
          type="button"
          className={`flex items-center gap-2.5 self-stretch py-1 px-5 rounded-md font-['Pretendard'] text-sm md:text-base leading-[normal] md:leading-[1.375rem] cursor-pointer hover:text-[#f1f1f5] ${e.value === value ? 'bg-[#353542] text-[#f1f1f5]' : 'text-[#6e6e82]'}`}
          onClick={() => {
            onChange(e.value);
            clickHandler(false);
          }}
        >
          {e.label}
        </button>
      ))
    ) : (
      <div className="flex items-center gap-2.5 self-stretch py-1 px-5 rounded-md font-['Pretendard'] text-sm md:text-base leading-[normal] md:leading-[1.375rem] text-[#6e6e82]">
        검색 결과가 없습니다.
      </div>
    );
  }, [search]);

  return (
    <div>
      <div
        className={`${widthSize} ${heightSize} ${type.includes('tag') ? 'px-4 lg:px-5' : 'px-5'} ${
          isOpen ? 'border-[#5097fa] bg-[#252530]' : 'border-[#353542] bg-[#252530]'
        } flex justify-between items-center rounded-lg border `}
      >
        {value && type.includes('tag') ? (
          <div className={`${type === 'tag_first' ? 'bg-[#05d58b]/[.10]' : 'bg-[#ff2f9f]/[.10]'} p-2 rounded-md`}>
            <div className="flex items-center justify-start gap-2.5">
              <div
                className={`${type === 'tag_first' ? 'text-[#05d58b]' : 'text-[#ff2f9f]'} text-sm md:text-base font-['Pretendard'] leading-[normal]`}
              >
                {option.find((e) => e.value === value)?.label}
              </div>
              <button
                type="button"
                className="flex items-start gap-2.5 p-0.5 rounded-md bg-black/50"
                onClick={() => {
                  onChange('');
                  setSearch('');
                }}
              >
                <CancelButtonIcon />{' '}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center self-stretch w-full">
            <input
              ref={btnRef as RefObject<HTMLInputElement>}
              value={search}
              className={`${isOpen ? 'text-[#f1f1f5]' : 'text-[#6e6e82]'} w-full bg-transparent focus:outline-none mt-[0.37rem] mb-[0.42rem] text-sm md:text-base leading-[normal]`}
              onChange={(e: React.ChangeEvent) => {
                const target = e.target as HTMLInputElement;
                clickHandler(!!target.value);
                setSearch(target.value);
              }}
            />
            <DropdownSelector open={isOpen} />
          </div>
        )}
      </div>

      {isOpen && (
        <div className="relative">
          <div className="absolute top-2">
            <div
              className={`${widthSize} state_menu__size_l flex flex-col items-start p-2 rounded-lg border border-[#353542] bg-[#252530]`}
            >
              {optionList}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * @type option - Dropdown Option List {label: string, value: any}
 * @type value - 해당 Dropdown의 선택된 값 or default value
 * @type onChange - Option List 선택 시 Change Event Handler
 * @type type - search Dropdown Type
 */
interface DropdownProps extends Props {
  /**
   * category(default) - default dropdown
   * sort - 상품 정렬을 위한 dropdown
   */
  type?: 'category' | 'sort';
}

export function Dropdown({ option, value, onChange, type = 'category' }: DropdownProps) {
  // dropdown hook
  const { btnRef, isOpen, clickHandler } = useDropdown();

  /**
   * type 별 반응형 (width)
   */
  const widthSize = useMemo(() => {
    switch (type) {
      case 'sort':
        return 'w-[8.375rem] md:w-[11.25rem] lg:w-[12.5rem]';
      default:
        return 'w-[18.4375rem] md:w-[22.5rem]';
    }
  }, [type]);

  /**
   * type 별 반응형 (height)
   */
  const heightSize = useMemo(() => {
    switch (type) {
      case 'sort':
        return 'h-[1.375rem] lg:h-[1.5rem]';
      default:
        return 'h-[3.4375rem] md:h-[3.75rem] lg:h-[4.375rem]';
    }
  }, [type]);

  return (
    <div>
      <button
        ref={btnRef as RefObject<HTMLButtonElement>}
        type="button"
        className={`${widthSize} ${heightSize} ${
          type !== 'sort'
            ? `border pt-[1.4375rem] pb-[1.4375rem] ${isOpen ? 'border-[#5097fa] bg-[#252530]' : 'border-[#353542] bg-[#252530]'}`
            : ''
        } flex items-center px-5 rounded-lg`}
        onClick={() => {
          clickHandler();
        }}
      >
        <div className="flex justify-between items-center self-stretch w-full">
          <div
            className={`${isOpen ? 'text-[#f1f1f5]' : 'text-[#6e6e82]'} font-['Pretendard'] text-sm md:text-base leading-[normal]`}
          >
            {option.find((e) => e.value === value)?.label}
          </div>
          <DropdownSelector open={isOpen} />
        </div>
      </button>

      {isOpen && (
        <div className="relative">
          <div className="absolute top-2">
            <div
              className={`${widthSize} state_menu__size_l flex flex-col items-start p-2 rounded-lg border border-[#353542] bg-[#252530]`}
            >
              {option.map((e) => (
                <button
                  key={e.value}
                  type="button"
                  className={`flex items-center gap-2.5 self-stretch py-1 px-5 rounded-md font-['Pretendard'] text-sm md:text-base leading-[normal] md:leading-[1.375rem] cursor-pointer hover:text-[#f1f1f5] ${e.value === value ? 'bg-[#353542] text-[#f1f1f5]' : 'text-[#6e6e82]'}`}
                  onClick={() => {
                    onChange(e.value);
                    clickHandler();
                  }}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
