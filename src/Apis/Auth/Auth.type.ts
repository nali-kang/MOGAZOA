export type PostUserPayload = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};
export type PostAuthPayload = {
  email: string;
  password: string;
};
export type PostAuthRes = {
  accessToken: string;
  user: {
    id: number;
    email: string;
    description?: string;
    image?: string;
    teamId?: string;
    nickname: string;
    updatedAt: string; // iso문자열로?
    createdAt: string; // iso문자열로?
  };
};
