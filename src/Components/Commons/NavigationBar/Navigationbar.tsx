'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Searchbar from './Searchbar';

function NavigationBar() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleSearchClick = () => {
    setIsSearchClicked(!isSearchClicked);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search')) {
        setIsSearchClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between w-full h-[70px] bg-bgblack px-[20px]  min-w-[375px] md:hidden ">
        <Image src="/icons/menu-icon.svg" alt="메뉴이미지" width={24} height={24} />
        {!isSearchClicked && (
          <>
            <Image src="/icons/large-logo-icon.svg" alt="로고이미지" width={112} height={16} />
            <Image
              src="/icons/search-icon.svg"
              alt="검색이미지"
              width={24}
              height={24}
              onClick={handleSearchClick}
              className="cursor-pointer"
            />
          </>
        )}
        {isSearchClicked && <Searchbar />}
      </nav>
      <nav className="hidden md:flex items-center bg-bgblack h-[80px] px-[30px] xl:h-[100px] xl:px-[120px] ">
        <div
          className="w-[138px] h-[24px] xl:w-[166px] xl:h-[28px] bg-cover bg-center"
          style={{ backgroundImage: 'url(/icons/large-logo-icon.svg)' }}
        />
        <div className="flex items-center ml-auto gap-[30px] xl:gap-[60px]">
          <Searchbar />
          <p className="text-white text-sm xl:text-base font-normal font-['Pretendard']">
            {isAuthorized ? '비교하기' : '로그인'}
          </p>
          <p className="text-white text-sm xl:text-base font-normal font-['Pretendard']">
            {isAuthorized ? '내 프로필' : '회원가입'}
          </p>
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;
