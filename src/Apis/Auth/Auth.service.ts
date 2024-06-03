/* eslint-disable class-methods-use-this */

import { apiRequestor } from '../requestor';
import { PostAuthPayload, PostUserPayload } from './Auth.type';

class AuthService {
  postAuthSignUp(payload: PostUserPayload) {
    return apiRequestor.post(`/auth/signUp`, payload);
  }

  postAuthSignIn(payload: PostAuthPayload) {
    return apiRequestor.post(`/auth/signIn`, payload);
  }
}
/* 
  TODO: Oauth등록후 추가
  /18/auth/signUp/{provider}
  /18/auth/signIn/{provider}
*/

export default new AuthService();
