import axios from "axios";

type RequestProps = {
  pathname: string;
  data: any;
};

const baseURL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://dev.rapptrlabs.com";
axios.defaults.baseURL = baseURL;

export const postApi = async <T>({
  pathname,
  data,
}: RequestProps): Promise<T> => {
  try {
    const response = await axios.request({
      method: "POST",
      url: pathname,
      headers: {
        Accept: "application/json",
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
