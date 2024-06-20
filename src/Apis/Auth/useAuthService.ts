'use client';

import { useMutation } from '@tanstack/react-query';

import { PostAuthPayload, PostAuthRes, PostUserPayload } from './Auth.type';
import queryOptions from './queries';
import { selectData } from '../Utils';

/**
 * 사용자 회원가입을 처리합니다.
 * @param payload \{
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}
 * @returns \{
  "accessToken": string,
  "user": {
    "id": number,
    "email": string,
    "description": string,
    "image": string,
    "teamId": string,
    "nickname": string,
    "updatedAt": Date,
    "createdAt": Date
  }
}
 */

export function usePostAuthSignUp(payload: PostUserPayload) {
  const res = useMutation(queryOptions.postAuthSignUp(payload));
  return selectData<PostAuthRes>(res);
}
/**
 * 사용자 로그인을 처리합니다.
 * @param payload \{
  email: string;
  password: string;
}
 * @returns \{
  "accessToken": string,
  "user": {
    "id": number,
    "email": string,
    "description": string,
    "image": string,
    "teamId": string,
    "nickname": string,
    "updatedAt": Date,
    "createdAt": Date
  }
}
 */

export function usePostAuthSignIn(payload: PostAuthPayload) {
  const res = useMutation(queryOptions.postAuthSignIn(payload));
  return selectData<PostAuthRes>(res);
}

/**
 * 간편 회원가입을 처리합니다.
 * @param provider 제공자 (google, kakao)
 * @param payload \{
  nickname: string;
  redirectUri: string;
  token: string;
}
 * @returns \{
  "accessToken": string,
  "user": {
    "id": number,
    "email": string,
    "description": string,
    "image": string,
    "teamId": string,
    "nickname": string,
    "updatedAt": Date,
    "createdAt": Date
  }
}
 */
export function usePostOAuthSignUp(provider: string, payload: { nickname: string; redirectUri: string; token: string }) {
  const res = useMutation(queryOptions.postOAuthSignUp(provider, payload));
  return selectData<PostAuthRes>(res);
}

/**
 * 간편 로그인을 처리합니다.
 * @param provider 제공자 (google, kakao)
 * @param payload \{
  redirectUri: string;
  token: string;
}
 * @returns \{
  "accessToken": string,
  "user": {
    "id": number,
    "email": string,
    "description": string,
    "image": string,
    "teamId": string,
    "nickname": string,
    "updatedAt": Date,
    "createdAt": Date
  }
}
 */
export function usePostOAuthSignIn(provider: string, payload: { redirectUri: string; token: string }) {
  const res = useMutation(queryOptions.postOAuthSignIn(provider, payload));
  return selectData<PostAuthRes>(res);
}