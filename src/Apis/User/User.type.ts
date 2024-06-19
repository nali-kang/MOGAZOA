export type PatchUserProps = {
  description: string;
  nickname: string;
  image: string | null;
};
export type UserId = {
  userId: number;
};
export type UserMeId = {
  userMeId: number;
};
export type RankingInfo = {
  id: number;
  nickname: string;
  description: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  followersCount: number;
  reviewCount: number;
};
export type GetUserRanking = RankingInfo[];
export type UserInformationRes = {
  id: number;
  nickname: string;
  description: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  teamId: number;
  isFollowing: boolean;
  followersCount: number;
  followeesCount: number;
  reviewCount: number;
  averageRating: number;
  mostFavoriteCategory?: string;
};
export type PatchUserMeRes = {
  id: number;
  nickname: string;
  description: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  teamId: number;
};
export type Follow = {
  updatedAt: Date;
  createdAt: Date;
  teamId: string;
  image: string | null;
  description: string;
  nickname: string;
  id: number;
};
export type GetUserFollow = {
  list: Follow[];
  nextCursor: null;
};
export type Product = {
  updatedAt: Date;
  createdAt: Date;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string | null;
  name: string;
  id: number;
};
export type GetProduct = {
  nextCursor: number;
  list: Product[];
};
