import axiosInstance from "@/lib/axios";
import useAuthStore from "@/stores/use-auth-store";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.authLoading);

  const { data = {}, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users/role");

      return data || {};
    },
  });

  const role = data?.data?.role;

  return { role, roleLoading: isLoading || roleLoading };
};

export default useRole;
