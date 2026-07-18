import axiosInstance from "@/lib/axios";

export async function fetchAdminDashboard() {
  const { data } = await axiosInstance.get("/dashboard/admin");
  return data?.data ?? data ?? {};
}

export async function fetchLibrarianDashboard() {
  const { data } = await axiosInstance.get("/dashboard/librarian");
  return data?.data ?? data ?? {};
}

export async function fetchUserDashboard() {
  const { data } = await axiosInstance.get("/dashboard/user");
  return data?.data ?? data ?? {};
}
