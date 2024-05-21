'use client';

import Dropdown, { Option } from '@/Components/Commons/Dropdown';
import { useState } from 'react';

function TestPage() {
  const [selectOption, setSelectOption] = useState<string>('option');
  const option: Option[] = [
    { label: '옵션1', value: 'option' },
    { label: '옵션2', value: 'option1' },
    { label: '옵션3', value: 'option2' },
    { label: '옵션4', value: 'option3' },
  ];
  return (
    <Dropdown
      option={option}
      value={selectOption}
      onChange={(value: any) => {
        setSelectOption(value);
      }}
    />
  );
}

export default TestPage;
