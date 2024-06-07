import UserService from './User.service';
import { PatchUserProps } from './User.type';

const queryKeys = {
  getUserMe: () => ['getUserMe'] as const,
  patchUserMe: (payload: PatchUserProps) => ['patchUserMe', payload] as const,
  getUserRanking: () => ['getUserRanking'] as const,
  getUserInfo: (userId: number) => ['getUserInfo', userId] as const,
  getUserCreatedProduct: (userId: number) => ['getUserCreatedProduct', userId] as const,
  getUserReviewedProduct: (userId: number) => ['getUserReviewedProduct', userId] as const,
  getUserFavoriteProduct: (userId: number) => ['getUserFavoriteProduct', userId] as const,
  getUserFollowees: (userId: number) => ['getUserFollowees', userId] as const,
  getUserFollowers: (userId: number) => ['getUserFollowers', userId] as const,
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
  getUserCreatedProduct: (userId: number) => ({
    queryKey: queryKeys.getUserCreatedProduct(userId),
    queryFn: () => UserService.getUserCreatedProduct(userId),
  }),
  getUserReviewedProduct: (userId: number) => ({
    queryKey: queryKeys.getUserReviewedProduct(userId),
    queryFn: () => UserService.getUserReviewedProduct(userId),
  }),
  getUserFavoriteProduct: (userId: number) => ({
    queryKey: queryKeys.getUserFavoriteProduct(userId),
    queryFn: () => UserService.getUserFavoriteProduct(userId),
  }),
  getUserFollowees: (userId: number) => ({
    queryKey: queryKeys.getUserFollowees(userId),
    queryFn: () => UserService.getUserFollowees(userId),
  }),
  getUserFollowers: (userId: number) => ({
    queryKey: queryKeys.getUserFollowers(userId),
    queryFn: () => UserService.getUserFollowers(userId),
  }),
};

export default queryOptions;
