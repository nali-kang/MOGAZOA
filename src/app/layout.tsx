import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ModalProvider from '@/Context/ModalContext';
import ModalContainer from '@/Components/Commons/ModalContainer/ModalContainer';
import { SearchProvider } from './SearchContext';
import QueryProvider from './Providers';
import NavigationBar from '@/Components/Commons/NavigationBar/Navigationbar';

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
        <QueryProvider>
          <ModalProvider>
            <ModalContainer />
            <SearchProvider>
              <NavigationBar />
              {children}
            </SearchProvider>
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
