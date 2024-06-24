// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import ModalProvider from '@/Context/ModalContext';
import QueryProvider from './Providers';
import ClientSessionProvider from '@/Components/Auth/ClientSessionProvider';

export const metadata: Metadata = {
  title: 'MOGAZOA',
  description: 'MOGAZOA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className=" font-Pre">
      <body className="bg-black1 font-Pre">
        <ClientSessionProvider>
          <QueryProvider>
            <ModalProvider>{children}</ModalProvider>
          </QueryProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
