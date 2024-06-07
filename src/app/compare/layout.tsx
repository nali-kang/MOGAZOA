import NavigationBar from '@/Components/NavigationBar/Navigationbar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <NavigationBar firstTitle="비교하기" secondTitle="내프로필" />
      {children}
    </>
  );
}

export default Layout;
