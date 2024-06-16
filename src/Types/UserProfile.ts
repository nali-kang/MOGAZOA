export interface UserProfile {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
  reviewCount: number;
  followersCount: number;
}
export interface UserFollowee {
  followee: Follow | undefined;
}
export interface UserFollower {
  follower: Follow | undefined;
}
export interface Follow {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
}
