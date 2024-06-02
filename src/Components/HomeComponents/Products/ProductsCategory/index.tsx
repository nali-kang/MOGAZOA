import sortingOptions from '@/Constant/SortingOption';
import { ProductType } from '@/Types/ProductType';

import Products from '..';
import { useGetProductItems } from '@/Apis/Product/useProduct.Service';

interface ProductsCategoryProps {
  category: number | 'hot' | 'rating';
  sortingOption?: keyof typeof sortingOptions;
}

export default function ProductsCategory({ category, sortingOption }: ProductsCategoryProps) {
  const params = {};
  const { data } = useGetProductItems(params);
  let sortedProductData: ProductType[] = [];

  switch (category) {
    case 'hot':
      sortedProductData = data.list.sort(sortingOptions.like).slice(0, 6);
      break;
    case 'rating':
      sortedProductData = data.list.sort(sortingOptions.downstar);
      break;
    default:
      if (typeof category === 'number') {
        sortedProductData = data.list.filter((product: ProductType) => product.categoryId === category);
        if (sortingOption && sortingOptions[sortingOption]) {
          sortedProductData = sortedProductData.sort(sortingOptions[sortingOption]);
        }
      }
      break;
  }

  return (
    <div className="grid grid-cols-2 gap-[15px] lg:grid-cols-3 lg:gap-[20px] lg:w-full">
      {sortedProductData.map((product: ProductType) => (
        <Products key={product.id} product={product} />
      ))}
    </div>
  );
}
