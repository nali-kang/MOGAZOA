'use client';

import { useMutation } from '@tanstack/react-query';

import queryOptions from './queries';
import { selectData } from '../Utils';
import { FollowPayload, FollowRes } from './Follow.type';

/**
 * 사용자 회원가입을 처리합니다.
 * @param payload \{
  userId : number;
}
 * @TODO returns형식에서 필요한것만 설정
 * @returns \{
    "id": 1,
    "nickname": "seed",
    "description": "",
    "image": null,
    "createdAt": "2024-01-29T09:08:53.561Z",
    "updatedAt": "2024-01-29T09:08:53.561Z",
    "teamId": "default",
    "isFollowing": true,
    "followersCount": 3,
    "followeesCount": 0,
    "reviewCount": 0,
    "averageRating": 0,
    "mostFavoriteCategory": null
}
 */

export function usePostFollow(payload: FollowPayload) {
  const res = useMutation(queryOptions.postFollow(payload));
  return selectData<FollowRes>(res);
}
/**
 * 팔로우를 취소합니다.
 * @param payload \{
  userId : number;
}
 * @returns \{
    "id": 1,
    "nickname": "seed",
    "description": "",
    "image": null,
    "createdAt": "2024-01-29T09:08:53.561Z",
    "updatedAt": "2024-01-29T09:08:53.561Z",
    "teamId": "default",
    "isFollowing": false,
    "followersCount": 2,
    "followeesCount": 0,
    "reviewCount": 0,
    "averageRating": 0,
    "mostFavoriteCategory": null
}
 */

export function useDeleteFollow(payload: FollowPayload) {
  const res = useMutation(queryOptions.deleteFollow(payload));
  return selectData<FollowRes>(res);
  console.log(selectData);
}
