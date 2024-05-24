import type { ProductType } from '@/Types/ProductType';
import Image from 'next/image';

interface ProductProps {
  product: ProductType;
}

export default function Products({ product }: ProductProps) {
  const { reviewCount, favoriteCount, image, name, rating } = product;

  return (
    <div className="flex flex-col p-[10px] justify-center relative bg-scblack w-[160px] h-[183px] rounded-[8px] border border-black3">
      <div className="flex justify-center relative items-center overflow-hidden  w-[140px] h-[98px]">
        <Image src={image} alt="productImage" fill />
      </div>
      <p className="text-white text-[14px]">{name}</p>
      <div className="flex gap-[10px]">
        <p className="text-gray1 font-light">후기 {reviewCount}</p>
        <p className="text-gray1 font-light">찜 {favoriteCount}</p>
      </div>
      <div className="flex items-center gap-[2px]">
        <div className="relative w-[12px] h-[12px]">
          <Image src="/Icons/star-icon.svg" alt="productGrade" fill />
        </div>
        <p className="text-gray2 text-[12px] font-light">{rating}</p>
      </div>
    </div>
  );
}
