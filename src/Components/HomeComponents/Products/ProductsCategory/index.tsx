import Products from '..';
import productMockData from '../productMockData.json';

interface ProductType {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  name: string;
  id: number;
}

interface ProductsCategoryProps {
  category: number | 'hot' | 'rating';
}

export default function ProductsCategory({ category }: ProductsCategoryProps) {
  let sortedProductData: ProductType[] = [];

  switch (category) {
    case 'hot':
      sortedProductData = productMockData.list
        .sort((a: ProductType, b: ProductType) => b.favoriteCount - a.favoriteCount)
        .slice(0, 6);
      break;
    case 'rating':
      sortedProductData = productMockData.list.sort((a: ProductType, b: ProductType) => b.rating - a.rating);
      break;
    default:
      if (typeof category === 'number') {
        sortedProductData = productMockData.list.filter((product: ProductType) => product.categoryId === category);
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
