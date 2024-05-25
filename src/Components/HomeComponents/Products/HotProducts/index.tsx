import type { ProductType } from '@/Types/ProductType';
import Products from '..';
import productMockData from '../productMockData.json';

export default function HotProducts() {
  const sortedHotProductData = productMockData.list
    .sort((a: ProductType, b: ProductType) => b.favoriteCount - a.favoriteCount)
    .slice(0, 6);
  return (
    <div className="grid grid-cols-2 gap-[15px] lg:grid-cols-3 lg:gap-[20px]">
      {sortedHotProductData.map((product: ProductType) => (
        <Products key={product.id} product={product} />
      ))}
    </div>
  );
}
