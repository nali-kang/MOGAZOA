import Detail from '@/Components/ProductDetail/Detail';
import ProductStat from '@/Components/ProductDetail/ProductStat';
import ProductReview from '@/Components/ProductDetail/Review';

export default function ProductDetail() {
  return (
    <div className=" text-white flex justify-center">
      <div className=" text-white flex-col justify-center">
        <Detail />
        <div className=" font-semibold text-lg p-5 mt-4 xl:text-2xl">상품 통계</div>
        <ProductStat />
        <ProductReview />
      </div>
    </div>
  );
}
