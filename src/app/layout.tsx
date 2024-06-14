import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ModalProvider from '@/Context/ModalContext';
import NavigationBar from '@/Components/Commons/NavigationBar/Navigationbar';
import { SearchProvider } from './SearchContext';
import QueryProvider from './Providers';
import ClientSessionProvider from '@/Components/Auth/ClientSessionProvider';

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
      <body className={`${inter.className} bg-black1`}>
        <ClientSessionProvider>
          <QueryProvider>
            <ModalProvider>
              <SearchProvider>
                <NavigationBar />
                {children}
              </SearchProvider>
            </ModalProvider>
          </QueryProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
