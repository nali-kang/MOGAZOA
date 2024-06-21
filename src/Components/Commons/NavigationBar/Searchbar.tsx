'use client';

import { SetStateAction, useContext, useState } from 'react';
import Image from 'next/image';
import SearchContext from '@/app/SearchContext';
import { usePathname, useRouter } from 'next/navigation';

function Searchbar() {
  const url = usePathname();
  const router = useRouter();
  const { setSearchValue } = useContext(SearchContext);
  const [tempValue, setTempValue] = useState('');

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setTempValue(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setSearchValue(tempValue);
    if (url !== '/') {
      router.push('/');
    }
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="상품 이름을 검색해보세요"
        value={tempValue}
        onChange={handleInputChange}
        className="w-[291px] h-[48px] md:w-[300px] md:h-[50px] xl:w-[400px] xl:h-[56px] pl-[54px] xl:pl-[64px] pr-3 border rounded-[28px] bg-scblack border-scblack focus:outline-none font-['Pretendard'] placeholder-gray1 text-sm xl:text-base font-normal text-white search"
      />
      <Image
        src="/Icons/search-icon.svg"
        alt="검색이미지"
        width={24}
        height={24}
        className="absolute left-[15px] md:left-[20px] top-1/2 transform -translate-y-1/2 pointer-events-none"
      />
    </form>
  );
}

export default Searchbar;
