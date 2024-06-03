import { BaseQuery } from '../common.type';
import ProductService from './Product.service';
import { GetProductProps, GetProductReviewList, PostProductItems } from './Product.type';

const queryKeys = {
  getProductItems: (params: GetProductProps) => ['getProductItems', params] as const,
  postProductItems: (payload: PostProductItems) => ['postProductItems', payload] as const,
  getProductDetail: (productId: number) => ['getProductDetail', productId] as const,
  patchProductModify: (productId: number) => ['patchProductModify', productId] as const,
  getProductReviewList: (productId: number, params: GetProductReviewList) =>
    ['getProductReviewList', { productId, params }] as const,
  postProductFavorite: (productId: number) => ['postProductFavorite', productId] as const,
  deleteProductFavorite: (productId: number) => ['deleteProductFavorite', productId] as const,
};

const queryOptions = {
  getProductItems: (params: BaseQuery) => ({
    queryKey: queryKeys.getProductItems(params),
    queryFn: () => ProductService.getProductItems(params),
  }),
  postProductItems: (payload: PostProductItems) => ({
    mutationKey: queryKeys.postProductItems(payload),
    mutationFn: (patchPayload: PostProductItems) => ProductService.postProductItems(patchPayload),
  }),
  getProductDetail: (productId: number) => ({
    queryKey: queryKeys.getProductDetail(productId),
    queryFn: () => ProductService.getProductDetail(productId),
  }),
  patchProductModify: (productId: number) => ({
    mutationKey: queryKeys.patchProductModify(productId),
    mutationFn: () => ProductService.patchProductModify(productId),
  }),
  getProductReviewList: (productId: number, params: GetProductReviewList) => ({
    queryKey: queryKeys.getProductReviewList(productId, params),
    queryFn: () => ProductService.getProductReviewList(productId, params),
  }),
  postProductFavorite: (productId: number) => ({
    mutationKey: queryKeys.postProductFavorite(productId),
    mutationFn: () => ProductService.postProductFavorite(productId),
  }),
  deleteProductFavorite: (productId: number) => ({
    mutationKey: queryKeys.deleteProductFavorite(productId),
    mutationFn: () => ProductService.deleteProductFavorite(productId),
  }),
};

export default queryOptions;
