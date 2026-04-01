import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useSecureAxios from "./useSecureAxios";

const useRole = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();

  const { data = {}, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user.email],
    queryFn: async () => {
      const { data } = await secureAxios("/users/role");

      return data || {};
    },
  });

  const role = data?.data?.role;

  return { role, roleLoading };
};

export default useRole;
