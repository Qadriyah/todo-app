import axios from "axios";

type RequestProps = {
  pathname: string;
  data: any;
};

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const postApi = async <T>({
  pathname,
  data,
}: RequestProps): Promise<T> => {
  try {
    const response = await axios.request({
      method: "POST",
      url: pathname,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      throw new Error(error.response.data);
    }
    if (error?.data) {
      throw new Error(error.data);
    }
    throw error;
  }
};
