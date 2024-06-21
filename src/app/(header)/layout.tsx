import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SearchProvider } from '../SearchContext';
import { CategoryProvider } from '../CategoryContext';
import ClientNavigationBar from '@/Components/Commons/NavigationBar/ClientNavigationBar';
import ServerNavigationBar from '@/Components/Commons/NavigationBar/ServerNavigationBar';

export const metadata: Metadata = {
  title: 'MOGAZOA',
  description: 'MOGAZOA',
};

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <CategoryProvider>
        <ClientNavigationBar />
        <ServerNavigationBar />
        {children}
      </CategoryProvider>
    </SearchProvider>
  );
}
