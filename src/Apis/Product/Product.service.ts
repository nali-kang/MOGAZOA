/* eslint-disable class-methods-use-this */

// eslint-disable-next-line import/no-extraneous-dependencies
import { AxiosRequestConfig } from 'axios';
import { apiRequestor, apiRequestorToken } from '../requestor';
import { GetProductProps, GetProductReviewList, PostProductItems } from './Product.type';

class ProductService {
  // 상품 목록 조회
  getProductItems(params: GetProductProps) {
    const config: AxiosRequestConfig = { params };
    return apiRequestor.get(`/products`, config);
  }

  // 상품 생성(토큰)
  postProductItems(payload: PostProductItems) {
    return apiRequestorToken.post(`/products`, payload);
  }

  // 상품 상세 조회
  getProductDetail(productId: number) {
    return apiRequestor.get(`/products/${productId}`);
  }

  // 상품 수정
  patchProductModify(productId: number) {
    return apiRequestorToken.patch(`/products/${productId}`);
  }

  // 상품 리뷰 목록 조회
  getProductReviewList(productId: number, params: GetProductReviewList) {
    const config: AxiosRequestConfig = { params };
    return apiRequestor.get(`/products/${productId}/reviews`, config);
  }

  // 상품 찜하기(토큰)
  postProductFavorite(productId: number) {
    return apiRequestorToken.post(`/products/${productId}/favorite`);
  }

  // 상품 찜하기 취소(토큰)
  deleteProductFavorite(productId: number) {
    return apiRequestor.delete(`/products/${productId}/favorite`);
  }
}

export default new ProductService();
