import sortingOptions from '@/Constant/SortingOption';
import { ProductType } from '@/Types/ProductType';

import Products from '..';
import { useGetProductItems } from '@/Apis/Product/useProduct.Service';
import Link from 'next/link';
import { useInfinityRequest } from '@/Hooks/useInfinityRequest';
import { useEffect, useMemo } from 'react';

interface ProductsCategoryProps {
  category?: number;
  order?: 'recent' | 'rating' | 'reviewCount';
  sortingOption?: keyof typeof sortingOptions;
  searchValue?: string;
}

export default function ProductsCategory({ category, order, sortingOption, searchValue }: ProductsCategoryProps) {
  // const params = { keyword: searchValue, category, order };
  // const { data } = useGetProductItems(params);
  const { data, fetchNextPage, setTarget } = useInfinityRequest({
    queryKey: ['products'],
    requestParam: {
      ...(searchValue && { keyword: searchValue }),
      ...(category !== undefined && { category }),
      ...(order && { order }),
    },
    requestPath: '/products',
    method: 'GET',
  });

  useEffect(() => {
    fetchNextPage();
  }, []);

  let productList: any = useMemo(() => data?.pages?.map((page: Record<string, any>) => page.data.list).flat(), [data]);

  // let sortedProductData: ProductType[] = data.list;

  if (order === 'recent' && !category && !searchValue) {
    productList = productList?.slice(0, 6);
  }
  if (category) {
    productList = productList?.filter((product: ProductType) => product.categoryId === category);
  }

  if (sortingOption && sortingOptions[sortingOption]) {
    productList = productList?.sort(sortingOptions[sortingOption]);
  }

  if (!data || !productList || productList.length === 0) {
    return <div className="text-white">해당 상품이 없습니다</div>;
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-[15px] md-lg:grid-cols-2 lg:grid-cols-3 lg:gap-[20px] lg:w-full">
        {productList.map((product: ProductType) => (
          <div key={product.id}>
            <Link href={`product/${product.id}`}>
              <Products product={product} />
            </Link>
          </div>
        ))}
      </div>
      {order !== 'recent' && <div className="h-[1px]" ref={setTarget as any} />}
    </>
  );
}
