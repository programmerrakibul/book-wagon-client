import axiosInstance from "@/lib/axios";

export async function fetchWishlist(params) {
  const { data } = await axiosInstance.get("/favorites", { params });
  return data ?? {};
}
