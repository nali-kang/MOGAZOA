import CompareComponent from '@/Components/Compare/Compare';
import { Suspense } from 'react';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

function ComparePage({ searchParams }: Props) {
  return (
    <Suspense>
      <CompareComponent
        compareFirst={
          searchParams?.key1
            ? {
                rating: 4.5,
                reviewCount: 100,
                favoriteCount: 1000,
              }
            : undefined
        }
        compareSecond={
          searchParams?.key1
            ? {
                rating: 4.3,
                reviewCount: 100,
                favoriteCount: 1001,
              }
            : undefined
        }
      />
    </Suspense>
  );
}

export default ComparePage;
