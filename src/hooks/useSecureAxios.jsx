import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

const useSecureAxios = () => {
  return instance;
};

export default useSecureAxios;
