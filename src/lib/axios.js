import { logoutUser } from "@/stores/use-auth-store";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

const token = localStorage.getItem("__bw__token__");

axiosInstance.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.status === 401 || err.status === 403) {
      logoutUser();
      window.location.href = "/auth/login";
    }

    return Promise.reject(err);
  },
);

export default axiosInstance;
