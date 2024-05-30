import AuthService from './Auth.service';
import { PostAuthPayload, PostUserPayload } from './Auth.type';

const queryKeys = {
  postAuthSignUp: (payload: PostUserPayload) => ['PostUserPayload', payload] as const,
  postAuthSignIn: (payload: PostAuthPayload) => ['PostAuthPayload', payload] as const,
};

const queryOptions = {
  postAuthSignUp: (payload: PostUserPayload) => ({
    mutationKey: queryKeys.postAuthSignUp(payload),
    mutationFn: (postData: PostUserPayload) => AuthService.postAuthSignUp(postData),
  }),
  postAuthSignIn: (payload: PostAuthPayload) => ({
    mutationKey: queryKeys.postAuthSignIn(payload),
    mutationFn: (postData: PostAuthPayload) => AuthService.postAuthSignIn(postData),
  }),
};

export default queryOptions;
