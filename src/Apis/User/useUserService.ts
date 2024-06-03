import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import queryOptions from './queries';
import { BaseQuery } from '../common.type';
import {
  GetProduct as GetProductRes,
  GetUserFollow as GetUserFollowRes,
  GetUserRanking as GetUserRankingRes,
  PatchUserMeRes,
  PatchUserProps,
  UserId,
  UserInformationRes,
} from './User.type';
import { selectData } from '../Utils';

/**
 * 특정 사용자의 정보를 조회합니다.
 * @param params optional; \{
  offset?: number;
  limit?: number;
}
 */
export function useGetUserMe(params: BaseQuery) {
  const res = useSuspenseQuery(queryOptions.getUserMe(params));
  return selectData<UserInformationRes>(res);
}

/**
 * 내 정보를 수정합니다.
 * @param payload required; {
  description: string,
  nickname: string,
  image: string,
}
 * @returns \{
  item: ItemInfo;
  links: Array\<Link>;
}
 */
export function usePatchUserMe(payload: PatchUserProps) {
  const res = useMutation(queryOptions.patchUserMe(payload));
  return selectData<PatchUserMeRes>(res);
}

/**
 * 유저 랭킹 조회
 * @param params optional; \{
  offset?: number;
  limit?: number;
}
 */
export function useGetUserRanking(params: BaseQuery) {
  const res = useSuspenseQuery(queryOptions.getUserRanking(params));
  return selectData<GetUserRankingRes>(res);
}

/**
 * 유저 정보 조회
 * @param userId require; \{userId: number}
 * @param params optional; \{
  offset?: number;
  limit?: number;
}
 */
export function useGetUserInfo(userId: UserId, params: BaseQuery) {
  const res = useSuspenseQuery(queryOptions.getUserInfo(userId, params));
  return selectData<UserInformationRes>(res);
}

/**
 * 유저가 생성한 상품 조회
 * @param userId require;  \{userId: number}
 * @param params optional; \{
  offset?: number;
  limit?: number;
}
 */
export function useGetUserCreatedProduct(userId: UserId, params: BaseQuery) {
  const res = useSuspenseQuery(queryOptions.getUserCreatedProduct(userId, params));
  return selectData<GetProductRes>(res);
}

/**
 * 유저가 찜한 상품 조회
 * @param userId require; \{userId: number}
 * @param params optional; \{
  offset?: number;
  limit?: number;
}
 */
export function useGetUserReviewedProduct(userId: UserId, params: BaseQuery) {
  const res = useSuspenseQuery(queryOptions.getUserReviewedProduct(userId, params));
  return selectData<GetProductRes>(res);
}

/**
 * 유저가 찜한 상품 조회
 * @param userId require; \{userId: number}
 * @param params optional; \{
  offset?: number;
  limit?: number;
}
 */
export function useGetUserFavoriteProduct(userId: UserId, params: BaseQuery) {
  const res = useSuspenseQuery(queryOptions.getUserFavoriteProduct(userId, params));
  return selectData<GetProductRes>(res);
}

/**
 * 유저가 팔로우한 유저 조회(팔로잉)
 * @param userId require; \{userId: number}
 * @param params optional; \{
  offset?: number;
  limit?: number;
}
 */
export function useGetUserFollowees(userId: UserId, params: BaseQuery) {
  const res = useSuspenseQuery(queryOptions.getUserFollowees(userId, params));
  return selectData<GetUserFollowRes>(res);
}

/**
 * 유저를 팔로우한 유저 조회(팔로워)
 * @param userId require; \{userId: number}
 * @param params optional; \{
  offset?: number;
  limit?: number;
}
 */
export function useGetUserFollowers(userId: UserId, params: BaseQuery) {
  const res = useSuspenseQuery(queryOptions.getUserFollowers(userId, params));
  return selectData<GetUserFollowRes>(res);
}
