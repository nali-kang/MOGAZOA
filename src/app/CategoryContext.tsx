'use client';

import { createContext, useState, useContext, useMemo, ReactNode } from 'react';

interface CategoryContextType {
  selectedCategory: number | null;
  setSelectedCategory: (category: number | null) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
  children: ReactNode;
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const value = useMemo(() => ({ selectedCategory, setSelectedCategory }), [selectedCategory]);

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}

export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
