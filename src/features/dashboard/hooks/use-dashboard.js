import {
  fetchAdminDashboard,
  fetchLibrarianDashboard,
  fetchUserDashboard,
} from "@/features/dashboard/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export const dashboardKeys = {
  admin: ["dashboard", "admin"],
  librarian: ["dashboard", "librarian"],
  user: ["dashboard", "user"],
};

export function useAdminDashboard() {
  return useQuery({
    queryKey: dashboardKeys.admin,
    queryFn: fetchAdminDashboard,
  });
}

export function useLibrarianDashboard() {
  return useQuery({
    queryKey: dashboardKeys.librarian,
    queryFn: fetchLibrarianDashboard,
  });
}

export function useUserDashboard() {
  return useQuery({
    queryKey: dashboardKeys.user,
    queryFn: fetchUserDashboard,
  });
}
