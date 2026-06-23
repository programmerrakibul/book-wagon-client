import useAuthStore from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

const useRole = () => {
  const user = useAuthStore((s) => s.state.user);
  const isLoading = useAuthStore((s) => s.state.loading.authLoading);
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
