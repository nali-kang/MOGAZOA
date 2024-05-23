'use client';

import { Dropdown, DropdownSearch, Option } from '@/Components/Commons/Dropdown/DropdownComponent';
import { useState } from 'react';

function TestPage() {
  const [selectOption, setSelectOption] = useState<string>('option');
  const [search, setSearch] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [sorting, setSorting] = useState<'latest' | 'upstar' | 'downstar' | 'like'>('latest');

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

  const sort: Option[] = [
    { label: '최신순', value: 'latest' },
    { label: '별점 높은순', value: 'upstar' },
    { label: '별점 낮은순', value: 'downstar' },
    { label: '좋아요순', value: 'like' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Dropdown
        option={option}
        value={selectOption}
        onChange={(value: any) => {
          setSelectOption(value);
        }}
      />
      <Dropdown
        option={option}
        value={nickname}
        onChange={(value: any) => {
          setNickname(value);
        }}
        type="nickname"
      />
      <Dropdown
        option={sort}
        value={sorting}
        onChange={(value: any) => {
          setSorting(value);
        }}
        type="sort"
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
      />
    </div>
  );
}

export default TestPage;
