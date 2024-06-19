'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Searchbar from './Searchbar';
import Link from 'next/link';

function ClientNavigationBar() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const handleSearchClick = () => {
    setIsSearchClicked(!isSearchClicked);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest('.search')) {
        setIsSearchClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between w-full h-[70px] bg-bgblack px-[20px] min-w-[375px] md:hidden">
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
  );
}

export default ClientNavigationBar;
