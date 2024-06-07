import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ModalProvider from '@/Context/ModalContext';
import ModalContainer from '@/Components/Commons/ModalContainer/ModalContainer';
import Providers from './Providers';
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
          <Providers>
            <ModalProvider>
              <ModalContainer />
              {children}
            </ModalProvider>
          </Providers>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
