import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ModalProvider from '@/Context/ModalContext';
import { SearchProvider } from './SearchContext';
import QueryProvider from './Providers';
import ClientSessionProvider from '@/Components/Auth/ClientSessionProvider';
import ClientNavigationBar from '@/Components/Commons/NavigationBar/ClientNavigationBar';
import ServerNavigationBar from '@/Components/Commons/NavigationBar/ServerNavigationBar';

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
                <ClientNavigationBar />
                <ServerNavigationBar />
                {children}
              </SearchProvider>
            </ModalProvider>
          </QueryProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
