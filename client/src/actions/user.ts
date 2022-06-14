import { axiosApiInstance } from "./axios";
import { useLoggedIn } from "@Store";

//register user
export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const body = JSON.stringify({ name, email, password });

  try {
    const response = await axiosApiInstance.post(`/register`, body);
    const { data } = response;

    if (data.error) {
      return data.error;
    } else {
      localStorage.setItem("token", data.token.token);
      localStorage.setItem("refreshToken", data.refreshToken.token);
      return true;
    }
  } catch (error) {
    if (error.response.data) return error.response.data;
    return false;
  }
};

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
    const response = await axiosApiInstance.post(`/login`, body, {
      withCredentials: true,
    });
    const { data } = response;

    if (data.error) {
      return data.error;
    } else {
      localStorage.setItem("token", data.token.token);
      localStorage.setItem("refreshToken", data.refreshToken.token);
      return true;
    }
  } catch (error) {
    if (error.response.data) return error.response.data;
    return false;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosApiInstance.post(`/logout`, {});
    const { data } = response;

    if (data.error) {
      return data.error;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
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
    const body = JSON.stringify({ token: refresh_token });
    const response = await axiosApiInstance.post(`/refreshtoken`, body);
    const { data } = response;
    localStorage.setItem("token", data.token.token);
    return true;
  }
};

export const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem("refreshToken");
  if (!refresh_token) {
    localStorage.removeItem("token");
    useLoggedIn.getState().setIsLoggedIn(false);
    return false;
  }
  const body = JSON.stringify({ token: refresh_token });
  const response = await axiosApiInstance.post(`/refreshtoken`, body);
  const { data } = response;

  localStorage.setItem("token", data.token.token);

  const token = localStorage.getItem("token");
  return token;
};
