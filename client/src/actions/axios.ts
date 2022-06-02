import axios from "axios";

export const axiosApiInstance = axios.create({
  baseURL: "http://localhost:4000/v1/",
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    } else {
      config.headers = {
        "content-type": "application/json",
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
//axiosApiInstance.interceptors.response.use(
//(response) => {
//return response;
//},
//async function (error) {
//const originalRequest = error.config;
//console.log("Re-try axios logic");
//if (error.response?.status === 401 && !originalRequest._retry) {
//originalRequest._retry = true;
//const access_token = await refreshAccessToken();
//axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
//return axiosApiInstance(originalRequest);
//}
//return Promise.reject(error);
//}
//);
