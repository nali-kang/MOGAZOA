'use client';

import { useGetProductDetail } from '@/Apis/Product/useProduct.Service';
import Detail from './Detail';
import ProductStat from './ProductStat';
import ProductReview from './Review';
import { useParams } from 'next/navigation';

export default function ProductDetailContainer() {
  const { productId } = useParams() as { productId: string };
  const numberProductId = parseInt(productId, 10);
  const { data } = useGetProductDetail(numberProductId);

  // const token = Cookies.get('token');
  // console.log(token);

  // console.log(data);
  return (
    <div className=" text-white flex-col justify-center">
      <Detail data={data} />
      <div className=" font-semibold text-lg p-5 mt-4 xl:text-2xl">상품 통계</div>
      <ProductStat data={data} />
      <ProductReview productId={numberProductId} />
    </div>
  );
}
