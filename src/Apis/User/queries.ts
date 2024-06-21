import UserService from './User.service';
import { PatchUserProps } from './User.type';

export const queryKeys = {
  getUserMe: () => ['getUserMe'] as const,
  patchUserMe: (payload: PatchUserProps) => ['patchUserMe', payload] as const,
  getUserRanking: () => ['getUserRanking'] as const,
  getUserInfo: (userId: number) => ['getUserInfo', userId] as const,
  getUserCreatedProduct: (userId: number, cursor: number) => ['getUserCreatedProduct', { userId, cursor }] as const,
  getUserReviewedProduct: (userId: number, cursor: number) => ['getUserReviewedProduct', { userId, cursor }] as const,
  getUserFavoriteProduct: (userId: number, cursor: number) => ['getUserFavoriteProduct', { userId, cursor }] as const,
  getUserFollowees: (userId: number, cursor: number) => ['getUserFollowees', { userId, cursor }] as const,
  getUserFollowers: (userId: number, cursor: number) => ['getUserFollowers', { userId, cursor }] as const,
};

const queryOptions = {
  getUserMe: () => ({
    queryKey: queryKeys.getUserMe(),
    queryFn: () => UserService.getUserMe(),
  }),
  patchUserMe: (payload: PatchUserProps) => ({
    mutationKey: queryKeys.patchUserMe(payload),
    mutationFn: (patchPayload: PatchUserProps) => UserService.patchUserMe(patchPayload),
  }),
  getUserRanking: () => ({
    queryKey: queryKeys.getUserRanking(),
    queryFn: () => UserService.getUserRanking(),
  }),
  getUserInfo: (userId: number) => ({
    queryKey: queryKeys.getUserInfo(userId),
    queryFn: () => UserService.getUserInfo(userId),
  }),
  getUserCreatedProduct: (userId: number, cursor: number) => ({
    queryKey: queryKeys.getUserCreatedProduct(userId, cursor),
    queryFn: () => UserService.getUserCreatedProduct(userId, cursor),
  }),
  getUserReviewedProduct: (userId: number, cursor: number) => ({
    queryKey: queryKeys.getUserReviewedProduct(userId, cursor),
    queryFn: () => UserService.getUserReviewedProduct(userId, cursor),
  }),
  getUserFavoriteProduct: (userId: number, cursor: number) => ({
    queryKey: queryKeys.getUserFavoriteProduct(userId, cursor),
    queryFn: () => UserService.getUserFavoriteProduct(userId, cursor),
  }),
  getUserFollowees: (userId: number, userMeId: number, cursor: number) => ({
    queryKey: queryKeys.getUserFollowees(userId, cursor),
    queryFn: () => UserService.getUserFollowees(userId, userMeId, cursor),
  }),
  getUserFollowers: (userId: number, cursor: number) => ({
    queryKey: queryKeys.getUserFollowers(userId, cursor),
    queryFn: () => UserService.getUserFollowers(userId, cursor),
  }),
};

export default queryOptions;
