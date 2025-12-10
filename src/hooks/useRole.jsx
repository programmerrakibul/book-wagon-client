import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useSecureAxios from "./useSecureAxios";

const useRole = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();

  const { data: role = "", isLoading: roleLoading } = useQuery({
    queryKey: ["role", user.email],
    queryFn: async () => {
      const { data } = await secureAxios(`/users/${user.email}/role`);

      return data?.role;
    },
  });

  return { role, roleLoading };
};

export default useRole;
