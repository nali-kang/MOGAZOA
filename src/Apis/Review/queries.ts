import ReviewService from './Review.service';
import { PatchReview, PostReview } from './Review.type';

const queryKeys = {
  postReview: (params: PostReview) => ['postReview', params] as const,
  deleteReview: (reviewId: number) => ['deleteReview', reviewId] as const,
  postReviewLike: (reviewId: number) => ['postReviewLike', reviewId] as const,
  deleteReviewLike: (reviewId: number) => ['deleteReviewLike', reviewId] as const,
  patchReview: (reviewId: number, params: PatchReview) => ['patchReview', { reviewId, params }] as const,
};

const queryOptions = {
  postReview: (params: PostReview) => ({
    mutationKey: queryKeys.postReview(params),
    mutationFn: (prop: PostReview) => ReviewService.postReview(prop),
  }),
  deleteReview: (reviewId: number) => ({
    mutationKey: queryKeys.deleteReview(reviewId),
    mutationFn: (prop: number) => ReviewService.deleteReview(prop),
  }),
  postReviewLike: (reviewId: number) => ({
    mutationKey: queryKeys.postReviewLike(reviewId),
    mutationFn: (id: number) => ReviewService.postReviewLike(id),
  }),
  deleteReviewLike: (reviewId: number) => ({
    mutationKey: queryKeys.deleteReviewLike(reviewId),
    mutationFn: (id: number) => ReviewService.deleteReviewLike(id),
  }),
  patchReview: (reviewId: number, params: PatchReview) => ({
    mutationKey: queryKeys.patchReview(reviewId, params),
    mutationFn: (patchData: PatchReview) => ReviewService.patchReview(reviewId, patchData),
  }),
};

export default queryOptions;
