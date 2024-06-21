// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ModalProvider from '@/Context/ModalContext';
import QueryProvider from './Providers';
import ClientSessionProvider from '@/Components/Auth/ClientSessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MOGAZOA',
  description: 'MOGAZOA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-black1`}>
        <ClientSessionProvider>
          <QueryProvider>
            <ModalProvider>{children}</ModalProvider>
          </QueryProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
