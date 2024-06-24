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
export interface Follow {
  updatedAt: Date;
  createdAt: Date;
  teamId: string;
  image: string | null;
  description: string;
  nickname: string;
}

export interface FollowProps {
  id: number;
  followee: {
    updatedAt: Date;
    createdAt: Date;
    teamId: string;
    image: string | null;
    description: string;
    nickname: string;
    id: number;
  };
  follower: {
    updatedAt: Date;
    createdAt: Date;
    teamId: string;
    image: string | null;
    description: string;
    nickname: string;
    id: number;
  };
}
