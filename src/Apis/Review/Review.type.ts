export type Image = {
  source: string;
  id: number;
};

export type User = {
  image: string;
  nickname: string;
  id: number;
};

export type ReviewBase = {
  productId: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  content: string;
  rating: number;
  id: number;
};

export type PostReview = {
  productId: number;
  images: string[];
  content: string;
  rating: number;
};

export type PatchReview = {
  images: Image[];
  content: string;
  rating: number;
};

export type ReviewResponse = ReviewBase & {
  user: User;
  reviewImages: Image[];
  isLiked: boolean;
};

export type PostReviewRes = ReviewResponse;
export type PatchReviewRes = ReviewResponse;
export type PostReviewLikeRes = ReviewResponse;
export type DeleteReviewLikeRes = ReviewResponse;

export type DeleteReviewRes = ReviewBase;
