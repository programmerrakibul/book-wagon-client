import { logoutUser } from "@/stores/useAuthStore";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
});

const useSecureAxios = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "tokenId",
      )}`;

      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          logoutUser();
          navigate("/auth/login");
        }

        return Promise.reject(err);
      },
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return instance;
};

export default useSecureAxios;
