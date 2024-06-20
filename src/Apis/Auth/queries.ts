import AuthService from './Auth.service';
import { PostAuthPayload, PostUserPayload } from './Auth.type';

const queryKeys = {
  postAuthSignUp: (payload: PostUserPayload) => ['PostUserPayload', payload] as const,
  postAuthSignIn: (payload: PostAuthPayload) => ['PostAuthPayload', payload] as const,
  postOAuthSignUp: (provider: string, payload: { nickname: string; redirectUri: string; token: string }) => ['PostOAuthSignUp', provider, payload] as const,
  postOAuthSignIn: (provider: string, payload: { redirectUri: string; token: string }) => ['PostOAuthSignIn', provider, payload] as const,
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
  postOAuthSignUp: (provider: string, payload: { nickname: string; redirectUri: string; token: string }) => ({
    mutationKey: queryKeys.postOAuthSignUp(provider, payload),
    mutationFn: () => AuthService.postOAuthSignUp(provider, payload),
  }),
  postOAuthSignIn: (provider: string, payload: { redirectUri: string; token: string }) => ({
    mutationKey: queryKeys.postOAuthSignIn(provider, payload),
    mutationFn: () => AuthService.postOAuthSignIn(provider, payload),
  }),
};
export default queryOptions;
