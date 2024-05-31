/* eslint-disable class-methods-use-this */

import { AxiosRequestConfig } from 'axios';
import { apiRequestor, apiRequestorToken } from '../requestor';
import { PatchUserProps, UserId } from './User.type';
import { BaseQuery } from '../common.type';

class UserService {
  getUserMe(params: BaseQuery) {
    const config: AxiosRequestConfig = { params };
    return apiRequestorToken.get(`/users/me`, config);
  }

  patchUserMe(payload: PatchUserProps) {
    return apiRequestorToken.patch(`/users/me`, payload);
  }

  getUserRanking(params: BaseQuery) {
    const config: AxiosRequestConfig = { params };
    return apiRequestor.get(`/users/ranking`, config);
  }

  getUserInfo(userID: UserId, params: BaseQuery) {
    const config: AxiosRequestConfig = { params };
    return apiRequestor.get(`/users/${userID}`, config);
  }

  getUserCreatedProduct(userID: UserId, params: BaseQuery) {
    const config: AxiosRequestConfig = { params };
    return apiRequestor.get(`/users/${userID}/created-products`, config);
  }

  getUserReviewedProduct(userID: UserId, params: BaseQuery) {
    const config: AxiosRequestConfig = { params };
    return apiRequestor.get(`/users/${userID}/reviewed-products`, config);
  }

  getUserFavoriteProduct(userID: UserId, params: BaseQuery) {
    const config: AxiosRequestConfig = { params };
    return apiRequestor.get(`/users/${userID}/favorite-products`, config);
  }

  getUserFollowees(userID: UserId, params: BaseQuery) {
    const config: AxiosRequestConfig = { params };
    return apiRequestor.get(`/users/${userID}/followees`, config);
  }

  getUserFollowers(userID: UserId, params: BaseQuery) {
    const config: AxiosRequestConfig = { params };
    return apiRequestor.get(`/users/${userID}/followers`, config);
  }
}

export default new UserService();
