'use client';

import { createContext, useMemo, useState } from 'react';

interface SearchContextProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchContext = createContext<SearchContextProps>({
  searchValue: '',
  setSearchValue: () => {},
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchValue, setSearchValue] = useState('');

  const value = useMemo(() => ({ searchValue, setSearchValue }), [searchValue]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
export default SearchContext;
