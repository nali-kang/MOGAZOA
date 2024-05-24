import type { ProductType } from '@/Types/ProductType';
import Products from '..';
import productMockData from '../productMockData.json';

export default function HotProducts() {
  return (
    <div>
      {productMockData.list.map((product: ProductType) => (
        <Products key={product.id} product={product} />
      ))}
    </div>
  );
}
