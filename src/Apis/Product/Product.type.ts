import { BaseQuery } from '../common.type';

export type GetOrderType = 'recent' | 'rating' | 'reviewCount';
export type OrderType = 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';

export type GetProductProps = BaseQuery & {
  keyword?: string;
  category?: number;
  order?: GetOrderType;
  cursor?: number;
};

export type ProductItems = {
  id: number;
  name: string;
  image?: string;
  rating: number;
  reviewCount: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  writerId: number;
  favoriteCount: number;
};

export type ProductId = {
  productId: number;
};

export type PostProductItems = {
  categoryId: number;
  image?: string;
  description: string;
  name: string;
};

export type GetProductReviewList = {
  order?: OrderType;
  cursor?: number;
};

export type CategoryMetric = {
  reviewCount: number;
  favoriteCount: number;
  rating: number;
};

export type Category = {
  name: string;
  id: number;
};

export type GetProductItemsRes = {
  nextCursor: number;
  list: ProductItems[];
};

export type PostProductItemsRes = ProductItems & {
  categoryMetric: CategoryMetric;
  category: Category;
  isFavorite: boolean;
  description: string;
};

export type ProductDetailRes = ProductItems & {
  description: string;
  isFavorite: boolean;
  category: Category;
  categoryMetric: CategoryMetric;
};

export type ReviewImage = {
  source: string;
  id: number;
};

export type ReviewUser = {
  image: string;
  nickname: string;
  id: number;
};

export type Review = {
  user: ReviewUser;
  reviewImages: ReviewImage[];
  productId: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
  content: string;
  rating: number;
  id: number;
};

export type GetProductReviewListRes = {
  nextCursor: number;
  list: Review[];
};

export type ProductFavoriteRes = ProductItems & {
  categoryMetric: CategoryMetric;
  category: Category;
  isFavorite: boolean;
  description: string;
};
