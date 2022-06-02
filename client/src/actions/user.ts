import Axios from "axios";
import { axiosApiInstance } from "./axios";
import { useLoggedIn } from "@Store";

//login user
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const body = JSON.stringify({ email, password });

  try {
    const response = await axiosApiInstance.post(`/login`, body);
    const { data } = response;

    if (data.error) {
      return data.error;
    } else {
      localStorage.setItem("token", data.token.token);
      //localStorage.setItem("refreshToken", data.refresh_token);
      return true;
    }
  } catch (error) {
    if (error.response.data) return error.response.data;
    return false;
  }
};

//Check localStorage for existing Token & Check if current token expired
export const checkToken = async () => {
  try {
    const response = await axiosApiInstance.post(`/checktokenexpire`, {});
    const { data } = response;
    return data;
  } catch {
    const refresh_token = localStorage.getItem("refreshToken");
    if (!refresh_token) {
      localStorage.removeItem("token");
      useLoggedIn.getState().setIsLoggedIn(false);
      return false;
    }
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + refresh_token,
      },
    };
    const response = await axiosApiInstance.post(`/refreshtoken`, {}, config);
    const { data } = response;
    localStorage.setItem("token", data.token);
    return true;
  }
};
