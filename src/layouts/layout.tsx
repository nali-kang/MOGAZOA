'use client';

import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import ModalProvider from '@/Context/ModalContext';
import QueryProvider from '@/app/Providers';
import ClientSessionProvider from '@/Components/Auth/ClientSessionProvider';

const inter = Inter({ subsets: ['latin'] });

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={`${inter.className} bg-black1 min-h-screen flex flex-col justify-center items-center`}>
      <ClientSessionProvider>
        <QueryProvider>
          <ModalProvider>{children}</ModalProvider>
        </QueryProvider>
      </ClientSessionProvider>
    </div>
  );
}


