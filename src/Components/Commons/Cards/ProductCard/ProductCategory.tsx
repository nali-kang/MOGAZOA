import { ProductType } from '@/Types/ProductType';

import {
  useGetUserCreatedProduct,
  useGetUserReviewedProduct,
  useGetUserFavoriteProduct,
} from '@/Apis/User/useUserService';
import ProductCard from './ProductCard';

interface ProductsCategoryProps {
  category: 'review' | 'created' | 'favorite';
  id: number;
}

export default function ProductsCategory({ category, id }: ProductsCategoryProps) {
  let SelectProductData: ProductType[] = [];
  const params = 0;
  const userId = id;
  const usersReviewProductInfo = useGetUserReviewedProduct(userId, params);
  const usersCreatedProductInfo = useGetUserCreatedProduct(userId, params);
  const usersFavoriteProductInfo = useGetUserFavoriteProduct(userId, params);
  switch (category) {
    case 'review':
      SelectProductData = usersReviewProductInfo.data.list;
      break;
    case 'created':
      SelectProductData = usersCreatedProductInfo.data.list;
      break;
    case 'favorite':
      SelectProductData = usersFavoriteProductInfo.data.list;
      break;
    default:
      break;
  }
  return Array.isArray(SelectProductData) && SelectProductData.length > 0 ? (
    <div className="grid grid-cols-2 gap-[15px] desktop:grid-cols-3 desktop:gap-[20px] mb-[40px]">
      {SelectProductData.map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center text-[15px] md:text-[20px] text-white w-[100%] md:h-[80px] desktop:h-[305px]">
      상품이 없습니다.
    </div>
  );
}
