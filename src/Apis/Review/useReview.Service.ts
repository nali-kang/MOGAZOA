import { useMutation } from '@tanstack/react-query';
import queryOptions from './queries';
import { selectData } from '../Utils';
import {
  DeleteReviewLikeRes,
  DeleteReviewRes,
  PatchReview,
  PatchReviewRes,
  PostReview,
  PostReviewLikeRes,
  PostReviewRes,
} from './Review.type';

/**
 * 리뷰 생성
 * @param params required; \{
  productId: number;
  images: string[];
  content: string;
  rating: number;
}
 */
export function usePostReview(params: PostReview) {
  const res = useMutation(queryOptions.postReview(params));
  return selectData<PostReviewRes>(res);
}

/**
 * 리뷰 삭제
 * @param reviewId required number;
 */
export function useDeleteReview(reviewId: number) {
  const res = useMutation(queryOptions.deleteReview(reviewId));
  return selectData<DeleteReviewRes>(res);
}

/**
 * 리뷰 좋아요
 * @param reviewId require number;
 */
export function usePostReviewLike(reviewId: number) {
  const res = useMutation(queryOptions.postReviewLike(reviewId));
  return selectData<PostReviewLikeRes>(res);
}

/**
 * 리뷰 좋아요 취소
 * @param reviewId require number;
 */
export function useDeleteReviewLike(reviewId: number) {
  const res = useMutation(queryOptions.deleteReviewLike(reviewId));
  return selectData<DeleteReviewLikeRes>(res);
}

/**
 * 리뷰 수정
 * @param reviewId require number;
 * @param params optional; \{
  images: Image[];
  content: string;
  rating: number;
}s
 */
export function usePatchReview(reviewId: number, params: PatchReview) {
  const res = useMutation(queryOptions.patchReview(reviewId, params));
  return selectData<PatchReviewRes>(res);
}
