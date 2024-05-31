import FollowService from './Follow.service';
import { FollowPayload } from './Follow.type';

const queryKeys = {
  postFollow: (payload: FollowPayload) => ['PostFollowPayload', payload] as const,
  deleteFollow: (payload: FollowPayload) => ['deleteFollow', payload] as const,
};

const queryOptions = {
  postFollow: (payload: FollowPayload) => ({
    mutationKey: queryKeys.postFollow(payload),
    mutationFn: (userId: FollowPayload) => FollowService.postFollow(userId),
  }),
  deleteFollow: (payload: FollowPayload) => ({
    mutationKey: queryKeys.deleteFollow(payload),
    mutationFn: (userId: FollowPayload) => FollowService.deleteFollow(userId),
  }),
};

export default queryOptions;
