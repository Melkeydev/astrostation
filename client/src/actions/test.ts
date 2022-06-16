import { axiosApiInstance } from "./axios";

// just a test path
export const testCall = async () => {
  try {
    const response = await axiosApiInstance.get(`/healthcheck`, {
      withCredentials: true,
    });
    console.log(response);
    const { data } = response;
    console.log(data);
    return data;
  } catch (err) {
    console.log("This is just a test");
    return false;
  }
};
