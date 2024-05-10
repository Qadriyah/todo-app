export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  user_id: number;
  user_email: string;
  user_username: string;
  user_is_active: number;
  user_profile_image: string;
  user_creation_epoch: number;
  user_is_new: number;
  user_token: string;
};

export type Todo = {
  id: number;
  name: string;
  createdAt: string;
};
