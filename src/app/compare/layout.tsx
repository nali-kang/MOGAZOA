import NavigationBar from '@/Components/Commons/NavigationBar/Navigationbar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
}

export default Layout;
