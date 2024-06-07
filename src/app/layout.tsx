import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
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
      <body className={`${inter.className} bg-bgblack`}>
        <ClientSessionProvider>
          <Providers>{children}</Providers>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
