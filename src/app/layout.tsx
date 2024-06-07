import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ModalProvider from '@/Context/ModalContext';
import ModalContainer from '@/Components/Commons/ModalContainer/ModalContainer';
import Providers from './Providers';
import NavigationBar from '@/Components/NavigationBar/Navigationbar';
import { SearchProvider } from './SearchContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MOGAZOA',
  description: 'MOGAZOA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-bgblack`}>
        <Providers>
          <ModalProvider>
            <ModalContainer />
            <SearchProvider>
              <NavigationBar firstTitle="비교하기" secondTitle="내 프로필" />
              {children}
            </SearchProvider>
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
