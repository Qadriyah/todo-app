export type Credentials = {
  email: string;
  password: string;
};

export type ApiResponse = {
  user_id: number;
  user_email: string;
  user_username: string;
  user_is_active: number;
  user_profile_image: string;
  user_creation_epoch: number;
  user_is_new: number;
  user_token: number;
};
