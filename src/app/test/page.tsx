'use client';

import { Dropdown, DropdownSearch, Option } from '@/Components/Commons/Dropdown/DropdownComponent';
import { useState } from 'react';

function TestPage() {
  const [selectOption, setSelectOption] = useState<string>('option');
  const [search, setSearch] = useState<string>('');
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
    <div className="flex gap-2">
      <Dropdown
        option={option}
        value={selectOption}
        onChange={(value: any) => {
          setSelectOption(value);
        }}
      />
      <DropdownSearch
        option={option}
        value={selectOption}
        onChange={(value: any) => {
          setSelectOption(value);
        }}
        type="tag_first"
      />
      <DropdownSearch
        option={option}
        value={search}
        onChange={(value: any) => {
          setSearch(value);
        }}
        type="tag_second"
      />
      <DropdownSearch
        option={option}
        value={search}
        onChange={(value: any) => {
          setSearch(value);
        }}
        type="search"
      />
    </div>
  );
}

export default TestPage;
