import type { ProductType } from '@/Types/ProductType';
import Image from 'next/image';

interface ProductProps {
  product: ProductType;
}

export default function Products({ product }: ProductProps) {
  const { reviewCount, favoriteCount, image, name } = product;

  return (
    <div className="relative">
      <div className="absolute w-[140px] h-[98px]">
        <Image src={image} alt="productImage" fill />
      </div>

      <p>{name}</p>
      <p>리뷰 {reviewCount}</p>
      <p>찜 {favoriteCount}</p>
      <div className="absolute w-[12px] h-[12px]">
        <Image src="/Icons/star-icon.svg" alt="productGrade" fill />
      </div>
    </div>
  );
}
