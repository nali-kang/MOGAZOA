'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import queryOptions from './queries';
import { selectData } from '../Utils';
import { GetCategories } from './Category.type';

/**
 * 카테고리를 가져옵니다.
 * @returns \{
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
 */
export default function useCategories() {
  const res = useSuspenseQuery(queryOptions.getCategories());
  return selectData<GetCategories>(res);
}
