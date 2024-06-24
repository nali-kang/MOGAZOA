/* eslint-disable class-methods-use-this */

import { AxiosRequestConfig } from 'axios';
import { apiRequestorToken } from '../requestor';
import { PatchReview, PostReview } from './Review.type';

class ReviewService {
  // 리뷰 생성
  postReview(params: PostReview) {
    return apiRequestorToken.post(`/reviews`, params);
  }

  // 리뷰 삭제
  deleteReview(reviewId: number) {
    return apiRequestorToken.delete(`/reviews/${reviewId}`);
  }

  // 리뷰 좋아요
  postReviewLike(reviewId: number) {
    return apiRequestorToken.post(`/reviews/${reviewId}/like`);
  }

  // 리뷰 좋아요 취소
  deleteReviewLike(reviewId: number) {
    return apiRequestorToken.delete(`reviews/${reviewId}/like`);
  }

  // 리뷰 수정
  patchReview(reviewId: number, params: PatchReview) {
    const config: AxiosRequestConfig = { params };
    return apiRequestorToken.patch(`reviews/${reviewId}`, config);
  }
}

export default new ReviewService();
