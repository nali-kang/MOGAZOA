import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SearchProvider } from '../SearchContext';
import { CategoryProvider } from '../CategoryContext';
import ClientNavigationBar from '@/Components/Commons/NavigationBar/ClientNavigationBar';
import ServerNavigationBar from '@/Components/Commons/NavigationBar/ServerNavigationBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MOGAZOA',
  description: 'MOGAZOA',
};

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-black1`}>
        <SearchProvider>
          <CategoryProvider>
            <ClientNavigationBar />
            <ServerNavigationBar />
            {children}
          </CategoryProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
