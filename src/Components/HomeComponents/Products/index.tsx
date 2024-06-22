import Image from 'next/image';

import type { ProductType } from '@/Types/ProductType';

interface ProductProps {
  product: ProductType;
}

export default function Products({ product }: ProductProps) {
  const { reviewCount, favoriteCount, image, name, rating } = product;

  return (
    <div className="flex flex-col p-[10px] justify-center relative bg-scblack border border-black3  w-full rounded-[8px] ">
      <div className="relative items-center overflow-hidden  w-full h-[98px] mb-[10px] md:mb-[20px] md:h-[160px] lg:h-[200px] lg:mb-[25px]">
        <Image src={image} alt="productImage" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      <p className="text-white text-[14px] mb-[5px] md:mb-[10px] md:text-[16px]  ">{name}</p>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex gap-[10px] text-gray1 font-light text-[12px] md:text-[14px] md:gap-[15px] lg:text-[16px]">
          <p>후기 {reviewCount}</p>
          <p>찜 {favoriteCount}</p>
        </div>
        <div className="flex items-center gap-[2px]">
          <div className="relative w-[12px] h-[12px]">
            <Image src="/Icons/star-icon.svg" alt="productGrade" fill />
          </div>
          <p className="text-gray2 text-[12px] font-light md:text-[14px] lg:text-[16px]">{rating.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}
