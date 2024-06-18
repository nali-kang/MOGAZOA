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
  followee: Follow ;
}
export interface UserFollower {
  follower: Follow ;
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
