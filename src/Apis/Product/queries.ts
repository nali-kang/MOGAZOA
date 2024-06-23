import { BaseQuery } from '../common.type';
import ProductService from './Product.service';
import { GetProductProps, GetProductReviewList, OrderType, PostProductItems } from './Product.type';

const queryKeys = {
  getProductItems: (params: GetProductProps) => ['getProductItems', params] as const,
  postProductItems: (payload: PostProductItems) => ['postProductItems', payload] as const,
  getProductDetail: (productId: number) => ['getProductDetail', productId] as const,
  patchProduct: (productId: number, payload: PostProductItems) => ['patchProduct', { productId, payload }] as const,
  getProductReviewList: (productId: number, order: OrderType, params?: GetProductReviewList) =>
    ['getProductReviewList', { productId, order, params }] as const,
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
  patchProduct: (productId: number, payload: PostProductItems) => ({
    mutationKey: queryKeys.patchProduct(productId, payload),
    mutationFn: ({ productId2, payload2 }: { productId2: number; payload2: PostProductItems }) =>
      ProductService.patchProduct({ productId2, payload2 }),
  }),
  getProductReviewList: (productId: number, order: OrderType, params?: GetProductReviewList) => ({
    queryKey: queryKeys.getProductReviewList(productId, order, params),
    queryFn: () => ProductService.getProductReviewList(productId, order, params),
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
