'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Searchbar from './Searchbar';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useGetUserMe } from '@/Apis/User/useUserService';

function NavigationBar() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [token, setIsToken] = useState('');
  const userMeInfo = useGetUserMe();

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
    const istoken = Cookies.get('token');
    if (istoken) {
      setIsToken(istoken);
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [token]);

  return (
    <>
      <nav className="flex items-center justify-between w-full h-[70px] bg-bgblack px-[20px]  min-w-[375px] md:hidden ">
        <Image src="/icons/menu-icon.svg" alt="메뉴이미지" width={24} height={24} />
        {!isSearchClicked && (
          <>
            <Link href="/">
              <Image src="/icons/large-logo-icon.svg" alt="로고이미지" width={112} height={16} />
            </Link>
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
        <Link
          href="/"
          className="w-[138px] h-[24px] xl:w-[166px] xl:h-[28px] bg-cover bg-center"
          style={{ backgroundImage: 'url(/icons/large-logo-icon.svg)' }}
        />
        <div className="flex items-center ml-auto gap-[30px] xl:gap-[60px]">
          <Searchbar />
          {isAuthorized ? (
            <Link className="text-white text-sm xl:text-base font-normal font-['Pretendard']" href="/compare">
              비교하기
            </Link>
          ) : (
            <Link className="text-white text-sm xl:text-base font-normal font-['Pretendard']" href="/login">
              로그인
            </Link>
          )}
          {isAuthorized ? (
            <Link
              className="text-white text-sm xl:text-base font-normal font-['Pretendard']"
              href={`/userprofile/${userMeInfo.data.id}`}
            >
              내 프로필
            </Link>
          ) : (
            <Link className="text-white text-sm xl:text-base font-normal font-['Pretendard']" href="/signup">
              회원가입
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;
