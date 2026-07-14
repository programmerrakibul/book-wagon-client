import { logoutUser } from "@/stores/use-auth-store";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  withCredentials: true,
});

const getToken = () => localStorage.getItem("__bw__token__");

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
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
      window.location.replace("/auth/login");
    }

    return Promise.reject(err);
  },
);

export default axiosInstance;
