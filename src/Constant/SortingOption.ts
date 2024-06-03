import { ProductType } from '@/Types/ProductType';

const sortingOptions = {
  latest: (a: ProductType, b: ProductType) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  downstar: (a: ProductType, b: ProductType) => a.rating - b.rating,
  upstar: (a: ProductType, b: ProductType) => b.rating - a.rating,
  like: (a: ProductType, b: ProductType) => b.favoriteCount - a.favoriteCount,
};
export default sortingOptions;
