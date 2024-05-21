'use client';

import { useState } from 'react';
import DropdownSelector from '../Icon/DropdownSelector';

export interface Option {
  label: string;
  value: any;
}

interface Props {
  option: Option[];
  value: any;
  onChange: (value: any) => void;
}

function Dropdown({ option, value, onChange }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <button
        type="button"
        className={`flex flex-col items-start gap-2.5 pt-[1.4375rem] pb-[1.4375rem] px-5 w-[400px] rounded-lg border ${
          open ? 'border-[#5097fa] bg-[#252530]' : 'border-[#353542] bg-[#252530]'
        }`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="flex justify-between items-center self-stretch">
          <div className={`${open ? 'text-[#f1f1f5]' : 'text-[#6e6e82]'} font-['Pretendard'] leading-[normal]`}>
            {option.find((e) => e.value === value)?.label}
          </div>
          <DropdownSelector open={open} />
        </div>
      </button>
      {open && (
        <div className="relative">
          <div className="absolute top-2">
            <div className="state_menu__size_l flex flex-col items-start p-2 w-[400px] rounded-lg border border-[#353542] bg-[#252530]">
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

export default Dropdown;
