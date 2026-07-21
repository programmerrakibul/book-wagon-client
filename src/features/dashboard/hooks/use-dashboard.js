import {
  fetchAdminDashboard,
  fetchLibrarianDashboard,
  fetchUserDashboard,
} from "@/features/dashboard/services/dashboard.service";
import useAuthStore from "@/store/use-auth-store";
import { useQuery } from "@tanstack/react-query";

export const dashboardKeys = {
  admin: ["dashboard", "admin"],
  librarian: ["dashboard", "librarian"],
  user: ["dashboard", "user"],
};

export function useAdminDashboard() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: [...dashboardKeys.admin, user?.email],
    queryFn: fetchAdminDashboard,
    enabled: !!user?.email,
  });
}

export function useLibrarianDashboard() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: [...dashboardKeys.librarian, user?.email],
    queryFn: fetchLibrarianDashboard,
    enabled: !!user?.email,
  });
}

export function useUserDashboard() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: [...dashboardKeys.user, user?.email],
    queryFn: fetchUserDashboard,
    enabled: !!user?.email,
  });
}
