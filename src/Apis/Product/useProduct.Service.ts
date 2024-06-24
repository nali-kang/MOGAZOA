import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import queryOptions from './queries';
import { selectData } from '../Utils';
import {
  GetProductItemsRes,
  GetProductProps,
  GetProductReviewList,
  GetProductReviewListRes,
  OrderType,
  PostProductItems,
  PostProductItemsRes,
  ProductDetailRes,
  ProductFavoriteRes,
} from './Product.type';

/**
 * 상품 목록 조회
 * @param params optional; \{
  offset?: number;
  limit?: number;
  keyword?: string;
  category?: number;
  order?: 'recent' | 'rating' | 'reviewCount';
  cursor?: number;
}
 */
export function useGetProductItems(params: GetProductProps) {
  const res = useSuspenseQuery(queryOptions.getProductItems(params));
  return selectData<GetProductItemsRes>(res);
}

/**
 * 상품 생성
 * @param payload required; {
  categoryId: number;
  image: null | string;
  description: string;
  name: string;
}
 */
export function usePostProductItems(payload: PostProductItems) {
  const res = useMutation(queryOptions.postProductItems(payload));
  return selectData<PostProductItemsRes>(res);
}

/**
 * 상품 상세 조회
 * @param productId require number;
 */
export function useGetProductDetail(productId: number) {
  const res = useSuspenseQuery(queryOptions.getProductDetail(productId));
  return selectData<ProductDetailRes>(res);
}

/**
 * 상품 수정
 * @param productId require number;
 * @param payload required; {
  categoryId: number;
  image: null | string;
  description: string;
  name: string;
}
 */
export function usePatchProduct(payload: PostProductItems, productId: number) {
  const res = useMutation(queryOptions.patchProduct(productId, payload));
  return selectData<ProductDetailRes>(res);
}

/**
 * 상품 리뷰 목록 조회
 * @param productId require number;
 * @param params optional; \{
  order?: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
  cursor?: number;
}
 */
export function useGetProductReviewList(productId: number, order: OrderType = 'recent', params?: GetProductReviewList) {
  const res = useSuspenseQuery(queryOptions.getProductReviewList(productId, order, params));
  return selectData<GetProductReviewListRes>(res);
}

/**
 * 상품 찜하기
 * @param productId require number;
 */
export function usePostProductFavorite(productId: number) {
  const res = useMutation(queryOptions.postProductFavorite(productId));
  return selectData<ProductFavoriteRes>(res);
}

/**
 * 찜한 상품 취소
 * @param productId require number;
 */
export function useDeleteProductFavorite(productId: number) {
  const res = useMutation(queryOptions.deleteProductFavorite(productId));
  return selectData<ProductFavoriteRes>(res);
}
