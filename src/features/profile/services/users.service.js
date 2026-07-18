import axiosInstance from "@/lib/axios";

export async function fetchUsers(params) {
  const { data } = await axiosInstance.get("/users", { params });
  return data ?? {};
}

export async function updateUserRole(id, role) {
  const { data } = await axiosInstance.patch(`/users/role/${id}`, { role });
  return data || {};
}
