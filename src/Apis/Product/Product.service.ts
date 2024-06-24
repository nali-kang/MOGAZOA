/* eslint-disable class-methods-use-this */

// eslint-disable-next-line import/no-extraneous-dependencies
import { AxiosRequestConfig } from 'axios';
import { apiRequestor, apiRequestorToken } from '../requestor';
import { GetProductProps, GetProductReviewList, OrderType, PostProductItems } from './Product.type';

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
    return apiRequestorToken.get(`/products/${productId}`);
  }

  // 상품 수정
  patchProduct({ productId2, payload2 }: { productId2: number; payload2: PostProductItems }) {
    console.log(productId2, payload2);
    return apiRequestorToken.patch(`/products/${productId2}`, payload2);
  }

  // 상품 리뷰 목록 조회
  getProductReviewList(productId: number, order: OrderType, params?: GetProductReviewList) {
    const config: AxiosRequestConfig = { params };
    return apiRequestorToken.get(`products/${productId}/reviews?order=${order}`, config);
  }

  // 상품 찜하기(토큰)
  postProductFavorite(productId: number) {
    return apiRequestorToken.post(`/products/${productId}/favorite`);
  }

  // 상품 찜하기 취소(토큰)
  deleteProductFavorite(productId: number) {
    return apiRequestorToken.delete(`/products/${productId}/favorite`);
  }
}

export default new ProductService();
