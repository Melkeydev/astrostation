import axios from "axios";

export const axiosApiInstance = axios.create({
  baseURL: "http://lvh.me:4000/v1/",
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      "content-type": "application/json",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// TODO: Right now, each token lasts 10 minutes.
// Refresh tokens last 24 hours
// When token expires, axios call will fail and then the interceptor
// will call a refresh token API to get a new token
// I THINK the issue is when the refresh token itself is expired
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
