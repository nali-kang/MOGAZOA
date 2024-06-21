'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Searchbar from './Searchbar';
import Link from 'next/link';
import Sidemenu from '@/Components/HomeComponents/Sidemenu';
import { useCategory } from '@/app/CategoryContext';

function ClientNavigationBar() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setSelectedCategory } = useCategory();

  const handleSearchClick = () => {
    setIsSearchClicked(!isSearchClicked);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategorySelect = (category: number | null) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      const { target } = event;
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
    <div>
      <nav className="flex items-center justify-between w-full h-[70px] bg-bgblack px-[20px] min-w-[375px] md:hidden">
        {!isSearchClicked && (
          <>
            <Link href="/"></Link>
          </>
        )}
        {isSearchClicked && <Searchbar />}
      </nav>
      {isMenuOpen && (
        <div className="md:hidden">
          <Sidemenu isMenuClick={isMenuOpen} onSelectCategory={handleCategorySelect} />
        </div>
      )}
    </div>
  );
}

export default ClientNavigationBar;
