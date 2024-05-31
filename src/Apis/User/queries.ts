import { BaseQuery } from '../common.type';
import UserService from './User.service';
import { PatchUserProps, UserId } from './User.type';

const queryKeys = {
  getUserMe: (params: BaseQuery) => ['getUserMe', params] as const,
  patchUserMe: (payload: PatchUserProps) => ['patchUserMe', payload] as const,
  getUserRanking: (params: BaseQuery) => ['getUserRanking', params] as const,
  getUserInfo: (userId: UserId, params: BaseQuery) => ['getUserInfo', { userId, params }] as const,
  getUserCreatedProduct: (userId: UserId, params: BaseQuery) => ['getUserCreatedProduct', { userId, params }] as const,
  getUserReviewedProduct: (userId: UserId, params: BaseQuery) =>
    ['getUserReviewedProduct', { userId, params }] as const,
  getUserFavoriteProduct: (userId: UserId, params: BaseQuery) =>
    ['getUserFavoriteProduct', { userId, params }] as const,
  getUserFollowees: (userId: UserId, params: BaseQuery) => ['getUserFollowees', { userId, params }] as const,
  getUserFollowers: (userId: UserId, params: BaseQuery) => ['getUserFollowers', { userId, params }] as const,
};

const queryOptions = {
  getUserMe: (params: BaseQuery) => ({
    queryKey: queryKeys.getUserMe(params),
    queryFn: () => UserService.getUserMe(params),
  }),
  patchUserMe: (payload: PatchUserProps) => ({
    mutationKey: queryKeys.patchUserMe(payload),
    mutationFn: (patchPayload: PatchUserProps) => UserService.patchUserMe(patchPayload),
  }),
  getUserRanking: (params: BaseQuery) => ({
    queryKey: queryKeys.getUserRanking(params),
    queryFn: () => UserService.getUserRanking(params),
  }),
  getUserInfo: (userId: UserId, params: BaseQuery) => ({
    queryKey: queryKeys.getUserInfo(userId, params),
    queryFn: () => UserService.getUserInfo(userId, params),
  }),
  getUserCreatedProduct: (userId: UserId, params: BaseQuery) => ({
    queryKey: queryKeys.getUserCreatedProduct(userId, params),
    queryFn: () => UserService.getUserCreatedProduct(userId, params),
  }),
  getUserReviewedProduct: (userId: UserId, params: BaseQuery) => ({
    queryKey: queryKeys.getUserReviewedProduct(userId, params),
    queryFn: () => UserService.getUserReviewedProduct(userId, params),
  }),
  getUserFavoriteProduct: (userId: UserId, params: BaseQuery) => ({
    queryKey: queryKeys.getUserFavoriteProduct(userId, params),
    queryFn: () => UserService.getUserFavoriteProduct(userId, params),
  }),
  getUserFollowees: (userId: UserId, params: BaseQuery) => ({
    queryKey: queryKeys.getUserFollowees(userId, params),
    queryFn: () => UserService.getUserFollowees(userId, params),
  }),
  getUserFollowers: (userId: UserId, params: BaseQuery) => ({
    queryKey: queryKeys.getUserFollowers(userId, params),
    queryFn: () => UserService.getUserFollowers(userId, params),
  }),
};

export default queryOptions;
