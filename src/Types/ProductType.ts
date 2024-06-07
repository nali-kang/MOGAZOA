export interface ProductType {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  name: string;
  id: number;
}

export interface ProductDetail {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  example: 1;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  pattern: string;
  name: string;
  id: number;
  categoryMetric: {
    reviewCount: number;
    favoriteCount: number;
    rating: number;
  };
  category: {
    name: string;
    id: number;
  };
  isFavorite: boolean;
  description: string;
}
