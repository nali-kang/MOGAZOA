import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MOGAZOA-상품디테일',
  description: '상품 디테일',
};

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
