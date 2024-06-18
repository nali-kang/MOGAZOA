import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import queryOptions from './queries';
import {
  GetProduct as GetProductRes,
  GetUserFollow as GetUserFollowRes,
  GetUserRanking as GetUserRankingRes,
  PatchUserMeRes,
  PatchUserProps,
  UserInformationRes,
} from './User.type';
import { selectData } from '../Utils';

/**
 * 특정 사용자의 정보를 조회합니다.
 */
export function useGetUserMe() {
  const res = useSuspenseQuery(queryOptions.getUserMe());
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
 */
export function useGetUserRanking() {
  const res = useSuspenseQuery(queryOptions.getUserRanking());
  return selectData<GetUserRankingRes>(res);
}

/**
 * 유저 정보 조회
}
 */
export function useGetUserInfo(userId: number) {
  const res = useSuspenseQuery(queryOptions.getUserInfo(userId));
  return selectData<UserInformationRes>(res);
}

/**
 * 유저가 생성한 상품 조회
 * @param userId require;  \number
 * @param cursor optional; \number 기본값0
 */
export function useGetUserCreatedProduct(userId: number, cursor: number = 0) {
  const res = useSuspenseQuery(queryOptions.getUserCreatedProduct(userId, cursor));
  return selectData<GetProductRes>(res);
}

/**
 * 유저가 찜한 상품 조회
 * @param userId require;  \number
 * @param cursor optional; \number 기본값0
}
 */
export function useGetUserReviewedProduct(userId: number, cursor: number = 0) {
  const res = useSuspenseQuery(queryOptions.getUserReviewedProduct(userId, cursor));
  return selectData<GetProductRes>(res);
}

/**
 * 유저가 찜한 상품 조회
 * @param userId require;  \number
 * @param cursor optional; \number 기본값0
}
 */
export function useGetUserFavoriteProduct(userId: number, cursor: number = 0) {
  const res = useSuspenseQuery(queryOptions.getUserFavoriteProduct(userId, cursor));
  return selectData<GetProductRes>(res);
}

/**
 * 유저가 팔로우한 유저 조회(팔로잉)
 * @param userId require;  \number
 * @param userMeId require;  \number
 * @param cursor optional; \number 기본값0
}
 */
export function useGetUserFollowees(userId: number, userMeId: number, cursor: number = 0) {
  const res = useSuspenseQuery(queryOptions.getUserFollowees(userId, userMeId, cursor));
  return selectData<GetUserFollowRes>(res);
}

/**
 * 유저를 팔로우한 유저 조회(팔로워)
 * @param userId require;  \number
 * @param cursor optional; \number 기본값0
}
 */
export function useGetUserFollowers(userId: number, cursor: number = 0) {
  const res = useSuspenseQuery(queryOptions.getUserFollowers(userId, cursor));
  return selectData<GetUserFollowRes>(res);
}
