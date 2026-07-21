import useAuthStore from "@/store/use-auth-store";
import { useQuery } from "@tanstack/react-query";
import { getUserRole } from "../services/auth.service";

const useRole = () => {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.authLoading);
  const email = user?.email;

  const { data = {}, isLoading: roleLoading } = useQuery({
    queryKey: ["role", email],
    queryFn: () => getUserRole(email),
    enabled: !!email,
  });

  const role = data?.data?.role;

  return { role, roleLoading: isLoading || roleLoading };
};

export default useRole;
