/* eslint-disable class-methods-use-this */

import { AxiosRequestConfig } from 'axios';
import { apiRequestor, apiRequestorToken } from '../requestor';
import { PatchUserProps } from './User.type';

class UserService {
  getUserMe() {
    return apiRequestorToken.get(`/users/me`);
  }

  patchUserMe(payload: PatchUserProps) {
    return apiRequestorToken.patch(`/users/me`, payload);
  }

  getUserRanking() {
    return apiRequestor.get(`/users/ranking`);
  }

  getUserInfo(userID: number) {
    return apiRequestor.get(`/users/${userID}`);
  }

  getUserCreatedProduct(userID: number, cursor: number) {
    return apiRequestor.get(`/users/${userID}/created-products?cursor=${cursor}`);
  }

  getUserReviewedProduct(userID: number, cursor: number) {
    return apiRequestor.get(`/users/${userID}/reviewed-products?cursor=${cursor}`);
  }

  getUserFavoriteProduct(userID: number, cursor: number) {
    return apiRequestor.get(`/users/${userID}/favorite-products?cursor=${cursor}`);
  }

  getUserFollowees(userID: number, cursor: number) {
    return apiRequestor.get(`/users/${userID}/followees?cursor=${cursor}`);
  }

  getUserFollowers(userID: number, cursor: number) {
    return apiRequestor.get(`/users/${userID}/followers?cursor=${cursor}`);
  }
}

export default new UserService();
