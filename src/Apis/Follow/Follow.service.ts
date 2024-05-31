/* eslint-disable class-methods-use-this */

import { AxiosRequestConfig } from 'axios';
import { apiRequestorToken } from '../requestor';
import { FollowPayload } from './Follow.type';

class FollowService {
  postFollow(payload: FollowPayload) {
    return apiRequestorToken.post(`/follow`, payload);
  }

  deleteFollow(payload: FollowPayload) {
    const config: AxiosRequestConfig = {
      data: payload,
    };
    return apiRequestorToken.delete(`/follow`, config);
  }
}

export default new FollowService();
