import axiosInstance from "@/lib/axios";
export async function updateProfile(payload) {
  const { data } = await axiosInstance.patch("/users/profile", payload);
  return data ?? {};
}
