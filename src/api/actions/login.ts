import { Credentials, User } from "@/types";
import { postApi } from "..";

export type LoginResponse = {
  status: number;
  data: User;
  error?: {
    message: string;
  };
};

export const loginUser = async (data: Credentials): Promise<LoginResponse> => {
  const response = await postApi<LoginResponse>({
    pathname: "/api/auth",
    data,
  });
  return response;
};
