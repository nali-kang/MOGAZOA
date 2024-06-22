import Link from 'next/link';
import { cookies } from 'next/headers';
import Searchbar from './Searchbar';

export default async function ServerNavigationBar() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const isAuthorized = !!token;
  const firstTitle = isAuthorized ? '비교하기' : '로그인';
  const secondTitle = isAuthorized ? '내 프로필' : '회원가입';
  return (
    <nav className="hidden md:flex items-center bg-bgblack h-[80px] px-[30px] xl:h-[100px] xl:px-[120px]">
      <Link
        href="/"
        className="w-[138px] h-[24px] xl:w-[166px] xl:h-[28px] bg-cover bg-center"
        style={{ backgroundImage: 'url(/Icons/large-logo-icon.svg)' }}
      />
      <div className="flex items-center ml-auto gap-[30px] xl:gap-[60px]">
        <Searchbar />
        <Link
          className="text-white text-sm xl:text-base font-normal font-['Pretendard']"
          href={isAuthorized ? '/compare' : '/login'}
        >
          {firstTitle}
        </Link>
        <Link
          className="text-white text-sm xl:text-base font-normal font-['Pretendard']"
          href={isAuthorized ? '/userprofile/mypage' : '/signup'}
        >
          {secondTitle}
        </Link>
      </div>
    </nav>
  );
}
