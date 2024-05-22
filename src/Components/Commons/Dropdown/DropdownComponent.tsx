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
  // eslint-disable-next-line react/no-unused-prop-types
  type?: 'tag_first' | 'tag_second' | 'search';
}
export function DropdownSearch({ option, value, onChange, type = 'search' }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    setSearch(option?.find((e) => e.value === value)?.label ?? '');
  }, [value]);

  const optionList = useMemo(() => {
    const searchFilter = option.filter((e) => e.label.includes(search));

    return searchFilter.length > 0 ? (
      searchFilter.map((e) => (
        <button
          type="button"
          className={`flex items-center gap-2.5 self-stretch py-1 px-5 rounded-md font-['Pretendard'] leading-[1.375rem] cursor-pointer hover:text-[#f1f1f5] ${e.value === value ? 'bg-[#353542] text-[#f1f1f5]' : 'text-[#6e6e82]'}`}
          onClick={() => {
            onChange(e.value);
            setOpen(false);
          }}
        >
          {e.label}
        </button>
      ))
    ) : (
      <div className="flex items-center gap-2.5 self-stretch py-1 px-5 rounded-md font-['Pretendard'] leading-[1.375rem] text-[#6e6e82]">
        검색 결과가 없습니다.
      </div>
    );
  }, [search]);

  return (
    <div>
      <div
        className={`${
          open ? 'border-[#5097fa] bg-[#252530]' : 'border-[#353542] bg-[#252530]'
        }  flex justify-between items-center px-5 w-[21.875rem] h-[4.375rem] rounded-lg border `}
      >
        {value && type.includes('tag') ? (
          <div className={`${type === 'tag_first' ? 'bg-[#05d58b]/[.10]' : 'bg-[#ff2f9f]/[.10]'} p-2 rounded-md`}>
            <div className="flex items-start gap-2.5 self-stretch">
              <div
                className={`${type === 'tag_first' ? 'text-[#05d58b]' : 'text-[#ff2f9f]'} font-['Pretendard'] leading-[normal]`}
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
              className={`${open ? 'text-[#f1f1f5]' : 'text-[#6e6e82]'} w-full bg-transparent focus:outline-none mt-[0.37rem] mb-[0.42rem] text-base leading-[normal]`}
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
            <div className="state_menu__size_l flex flex-col items-start p-2 w-[21.875rem] rounded-lg border border-[#353542] bg-[#252530]">
              {optionList}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Dropdown({ option, value, onChange }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <button
        type="button"
        className={`flex items-center pt-[1.4375rem] pb-[1.4375rem] px-5 w-[21.875rem] h-[4.375rem] rounded-lg border ${
          open ? 'border-[#5097fa] bg-[#252530]' : 'border-[#353542] bg-[#252530]'
        }`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="flex justify-between items-center self-stretch w-full">
          <div className={`${open ? 'text-[#f1f1f5]' : 'text-[#6e6e82]'} font-['Pretendard'] leading-[normal]`}>
            {option.find((e) => e.value === value)?.label}
          </div>
          <DropdownSelector open={open} />
        </div>
      </button>

      {open && (
        <div className="relative">
          <div className="absolute top-2">
            <div className="state_menu__size_l flex flex-col items-start p-2 w-[21.875rem] rounded-lg border border-[#353542] bg-[#252530]">
              {option.map((e) => (
                <button
                  type="button"
                  className={`flex items-center gap-2.5 self-stretch py-1 px-5 rounded-md font-['Pretendard'] leading-[1.375rem] cursor-pointer hover:text-[#f1f1f5] ${e.value === value ? 'bg-[#353542] text-[#f1f1f5]' : 'text-[#6e6e82]'}`}
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
