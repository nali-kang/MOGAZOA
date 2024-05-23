'use client';

import { useEffect, useMemo, useState } from 'react';
import DropdownSelector from '../Icon/DropdownSelector';
import CancelButtonIcon from '../Icon/CancelButtonIcon';

export interface Option {
  label: string;
  value: any;
}

interface Props {
  option: Option[];
  value: any;
  onChange: (value: any) => void;
}

interface SearchProps extends Props {
  type?: 'tag_first' | 'tag_second' | 'search';
}

export function DropdownSearch({ option, value, onChange, type = 'search' }: SearchProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    setSearch(option?.find((e) => e.value === value)?.label ?? '');
  }, [value]);

  const widthSize = useMemo(() => {
    switch (type) {
      case 'tag_first':
      case 'tag_second':
        return 'w-[20.9375rem] md:w-[15rem] lg:w-[21.875rem]';
      default:
        return 'w-[18.4375rem] md:w-[22.5rem]';
    }
  }, [type]);

  const heightSize = useMemo(() => {
    switch (type) {
      case 'tag_first':
      case 'tag_second':
        return 'h-[3.4375rem] lg:h-[4.375rem]';
      default:
        return 'h-[3.4375rem] md:h-[3.75rem] lg:h-[4.375rem]';
    }
  }, [type]);

  const optionList = useMemo(() => {
    const searchFilter = option.filter((e) => e.label.includes(search));

    return searchFilter.length > 0 ? (
      searchFilter.map((e) => (
        <button
          type="button"
          className={`flex items-center gap-2.5 self-stretch py-1 px-5 rounded-md font-['Pretendard'] text-sm md:text-base leading-[normal] md:leading-[1.375rem] cursor-pointer hover:text-[#f1f1f5] ${e.value === value ? 'bg-[#353542] text-[#f1f1f5]' : 'text-[#6e6e82]'}`}
          onClick={() => {
            onChange(e.value);
            setOpen(false);
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
          open ? 'border-[#5097fa] bg-[#252530]' : 'border-[#353542] bg-[#252530]'
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
              value={search}
              className={`${open ? 'text-[#f1f1f5]' : 'text-[#6e6e82]'} w-full bg-transparent focus:outline-none mt-[0.37rem] mb-[0.42rem] text-sm md:text-base leading-[normal]`}
              onChange={(e: React.ChangeEvent) => {
                const target = e.target as HTMLInputElement;
                setOpen(!!target.value);
                setSearch(target.value);
              }}
            />
            <DropdownSelector open={open} />
          </div>
        )}
      </div>

      {open && (
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

interface DropdownProps extends Props {
  type?: 'category' | 'sort' | 'nickname';
}

export function Dropdown({ option, value, onChange, type = 'category' }: DropdownProps) {
  const [open, setOpen] = useState<boolean>(false);

  const widthSize = useMemo(() => {
    switch (type) {
      case 'sort':
        return 'w-[6.375rem] md:w-[11.25rem] lg:w-[12.5rem]';
      case 'nickname':
        return 'w-[18.4375rem] md:w-[31.875rem] lg:w-[33.75rem]';
      default:
        return 'w-[18.4375rem] md:w-[22.5rem]';
    }
  }, [type]);

  const heightSize = useMemo(() => {
    switch (type) {
      case 'sort':
        return 'h-[1.375rem] lg:h-[1.5rem]';
      case 'nickname':
        return 'h-[3.4375rem] md:h-[3.75rem] lg:h-[4.375rem]';
      default:
        return 'h-[3.4375rem] md:h-[3.75rem] lg:h-[4.375rem]';
    }
  }, [type]);

  return (
    <div>
      <button
        type="button"
        className={`${widthSize} ${heightSize} ${
          type !== 'sort'
            ? `border pt-[1.4375rem] pb-[1.4375rem] ${open ? 'border-[#5097fa] bg-[#252530]' : 'border-[#353542] bg-[#252530]'}`
            : ''
        } flex items-center px-5 rounded-lg`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="flex justify-between items-center self-stretch w-full">
          <div
            className={`${open ? 'text-[#f1f1f5]' : 'text-[#6e6e82]'} font-['Pretendard'] text-sm md:text-base leading-[normal]`}
          >
            {option.find((e) => e.value === value)?.label}
          </div>
          <DropdownSelector open={open} />
        </div>
      </button>

      {open && (
        <div className="relative">
          <div className="absolute top-2">
            <div
              className={`${widthSize} state_menu__size_l flex flex-col items-start p-2 rounded-lg border border-[#353542] bg-[#252530]`}
            >
              {option.map((e) => (
                <button
                  type="button"
                  className={`flex items-center gap-2.5 self-stretch py-1 px-5 rounded-md font-['Pretendard'] text-sm md:text-base leading-[normal] md:leading-[1.375rem] cursor-pointer hover:text-[#f1f1f5] ${e.value === value ? 'bg-[#353542] text-[#f1f1f5]' : 'text-[#6e6e82]'}`}
                  onClick={() => {
                    onChange(e.value);
                    setOpen(false);
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
