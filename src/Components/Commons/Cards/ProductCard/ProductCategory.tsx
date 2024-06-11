import { ProductType } from '@/Types/ProductType';

import {
  useGetUserCreatedProduct,
  useGetUserReviewedProduct,
  useGetUserFavoriteProduct,
} from '@/Apis/User/useUserService';
import ProductCard from './ProductCard';

interface ProductsCategoryProps {
  category: string | 'review' | 'created' | 'favorite';
}

export default function ProductsCategory({ category }: ProductsCategoryProps) {
  let SelectProductData: ProductType[] = [];
  const params = {};
  const userId = 192;
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
    <div className="grid grid-cols-2 gap-[15px] xl:grid-cols-3 xl:gap-[20px]">
      {SelectProductData.map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center text-[15px] md:text-[20px] text-white w-[100%] md:h-[80px] xl:h-[266px]">
      상품이 없습니다.
    </div>
  );
}
