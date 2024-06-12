import type { Metadata } from 'next';
import NavigationBar from '@/Components/NavigationBar/Navigationbar';

export const metadata: Metadata = {
  title: 'MOGAZOA-상품디테일',
  description: '상품 디테일',
};

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar firstTitle="비교하기" secondTitle="내프로필" />
      {children}
    </>
  );
}
