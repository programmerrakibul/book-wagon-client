import useAuthStore from "@/stores/use-auth-store";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

const useRole = () => {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.authLoading);
  const secureAxios = useSecureAxios();

  const { data = {}, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await secureAxios("/users/role");

      return data || {};
    },
  });

  const role = data?.data?.role;

  return { role, roleLoading: isLoading || roleLoading };
};

export default useRole;
