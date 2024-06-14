import sortingOptions from '@/Constant/SortingOption';
import { ProductType } from '@/Types/ProductType';

import Products from '..';
import { useGetProductItems } from '@/Apis/Product/useProduct.Service';
import Link from 'next/link';

interface ProductsCategoryProps {
  category?: number;
  order?: 'recent' | 'rating' | 'reviewCount';
  sortingOption?: keyof typeof sortingOptions;
  searchValue?: string;
}

export default function ProductsCategory({ category, order, sortingOption, searchValue }: ProductsCategoryProps) {
  const params = { keyword: searchValue, category, order };
  const { data } = useGetProductItems(params);

  let sortedProductData: ProductType[] = data.list;

  if (order === 'recent' && !category && !searchValue) {
    sortedProductData = data.list.slice(0, 6);
  }
  if (category) {
    sortedProductData = data.list.filter((product: ProductType) => product.categoryId === category);
  }

  if (sortingOption && sortingOptions[sortingOption]) {
    sortedProductData = sortedProductData.sort(sortingOptions[sortingOption]);
  }

  if (!data || !data.list || data.list.length === 0) {
    return <div className="text-white">데이터가 없습니다</div>;
  }
  return (
    <div className="grid grid-cols-2 gap-[15px] lg:grid-cols-3 lg:gap-[20px] lg:w-full">
      {sortedProductData.map((product: ProductType) => (
        <Link href={`prdouct/${product.id}`}>
          <Products key={product.id} product={product} />
        </Link>
      ))}
    </div>
  );
}
