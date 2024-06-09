import { apiRequestor } from '@/Apis/server.requestor';
import CompareComponent from '@/Components/Compare/Compare';
import { ProductDetail } from '@/Types/ProductType';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}
/**
 * search param data를 가져와 조회, 상품 list 조회
 * @param searchParams - get Search Params (compare1, compare2)
 * @returns
 */
async function ComparePage({ searchParams }: Props) {
  let compare1: { data?: ProductDetail } = {};
  let compare2: { data?: ProductDetail } = {};

  if (searchParams?.compare1 && searchParams?.compare2) {
    [compare1, compare2] = await Promise.all([
      apiRequestor.get(`/products/${searchParams?.compare1 ? Number(searchParams?.compare1) : 0}`),
      apiRequestor.get(`/products/${searchParams?.compare2 ? Number(searchParams?.compare2) : 0}`),
    ]);
  }

  return (
    <CompareComponent
      compareFirst={
        searchParams?.compare1 && compare1?.data
          ? {
              rating: compare1.data.rating,
              reviewCount: compare1.data.reviewCount,
              favoriteCount: compare1.data.favoriteCount,
            }
          : undefined
      }
      compareSecond={
        searchParams?.compare2 && compare2?.data
          ? {
              rating: compare2.data.rating,
              reviewCount: compare2.data.reviewCount,
              favoriteCount: compare2.data.favoriteCount,
            }
          : undefined
      }
    />
  );
}

export default ComparePage;
