import axios from "axios";

const BASEURL = "http://localhost:5000"

export const axiosInstance = axios.create({
  baseURL: BASEURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["access_token"] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    Promise.reject(error);
  }
)