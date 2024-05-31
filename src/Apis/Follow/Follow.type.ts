export type FollowPayload = {
  userId: number;
};
export type FollowRes = {
  id: string;
  nickname: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  isFollowing: boolean;
  followersCount: number;
  followeesCount: number;
  reviewCount: number;
  averageRating: number;
  mostFavoriteCategory: null;
};
