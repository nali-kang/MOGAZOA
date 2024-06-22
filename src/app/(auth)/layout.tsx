import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MOGAZOA',
  description: 'MOGAZOA',
};

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
