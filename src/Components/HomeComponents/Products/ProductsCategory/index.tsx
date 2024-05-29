import sortingOptions from '@/Constant/SortingOption';
import Products from '..';
import productMockData from '../productMockData.json';
import { ProductType } from '@/Types/ProductType';

interface ProductsCategoryProps {
  category: number | 'hot' | 'rating';
  sortingOption?: keyof typeof sortingOptions;
}

export default function ProductsCategory({ category, sortingOption }: ProductsCategoryProps) {
  let sortedProductData: ProductType[] = [];

  switch (category) {
    case 'hot':
      sortedProductData = productMockData.list.sort(sortingOptions.like).slice(0, 6);
      break;
    case 'rating':
      sortedProductData = productMockData.list.sort(sortingOptions.downstar);
      break;
    default:
      if (typeof category === 'number') {
        sortedProductData = productMockData.list.filter((product: ProductType) => product.categoryId === category);
        if (sortingOption && sortingOptions[sortingOption]) {
          console.log(sortingOption);
          sortedProductData = sortedProductData.sort(sortingOptions[sortingOption]);
        }
      }
      break;
  }

  return (
    <div className="grid grid-cols-2 gap-[15px] lg:grid-cols-3 lg:gap-[20px]">
      {sortedProductData.map((product: ProductType) => (
        <Products key={product.id} product={product} />
      ))}
    </div>
  );
}
