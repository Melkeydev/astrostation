import { axiosApiInstance } from "./axios";

// just a test path
export const testCall = async () => {
  const response = await axiosApiInstance.get(`/healthcheck`, {
    withCredentials: true,
  });
  const { data } = response;
  return data;
};
