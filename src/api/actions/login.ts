import { Credentials, User } from "@/types";
import { postApi } from "..";

export type LoginResponse = User | any;

const mockUser = {
  user_id: 16,
  user_email: "test@rapptrlabs.com",
  user_username: "testuser",
  user_is_active: 1,
  user_profile_image:
    "http://dev.rapptrlabs.com/Tests/images/taylor_avatar.png",
  user_last_active_epoch: 1544680026,
  user_creation_epoch: 1544713200,
  user_is_new: 1,
  user_token:
    "6dd4737a8b7ec61313ae5e900420d46815e1d13b2902be71b97a8fbf1f421a3e",
};

export const loginUser = async (data: Credentials): Promise<LoginResponse> => {
  //   const response = await postApi<LoginResponse>({
  //     pathname: "/Tests/scripts/user-login.php",
  //     data,
  //   });
  //   return response;

  return mockUser;
};
