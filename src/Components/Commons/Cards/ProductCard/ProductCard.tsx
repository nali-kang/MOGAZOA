'use client';

import Image from 'next/image';
import type { ProductType } from '@/Types/ProductType';
import Link from 'next/link';

interface ProductProps {
  product: ProductType;
}

function ProductCard({ product }: ProductProps) {
  const { id, reviewCount, favoriteCount, image, name, rating } = product;

  return (
    <Link href={`/prdouct/${id}`}>
      <div className="flex flex-col p-[10px] justify-center relative bg-scblack border border-black3 min-w-[150px] desktop:min-w-[250px] w-full rounded-[8px] ">
        <div className="flex justify-center relative items-center overflow-hidden  w-full h-[98px] mb-[10px] md:mb-[20px]  md:h-[160px]  desktop:h=[200px] desktop:mb-[25px]">
          <Image src={image} alt="productImage" fill />
        </div>
        <p className="text-white text-[14px] mb-[5px] md:mb-[10px] md:text-[16px]  ">{name}</p>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex gap-[10px] text-gray1 font-light text-[12px] md:text-[14px] md:gap-[15px] desktop:text-[16px]">
            <p>리뷰 {reviewCount}</p>
            <p>찜 {favoriteCount}</p>
          </div>
          <div className="flex items-center gap-[2px]">
            <div className="relative w-[12px] h-[12px]">
              <Image src="/Icons/star-icon.svg" alt="productGrade" fill />
            </div>
            <p className="text-gray2 text-[12px] font-light md:text-[14px] desktop:text-[16px]">
              {Math.round(rating * 10) / 10}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default ProductCard;
