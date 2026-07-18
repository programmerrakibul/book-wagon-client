import axiosInstance from "@/lib/axios";

export async function checkFavorite(bookId) {
  const { data } = await axiosInstance.get(`/favorites/check/${bookId}`);
  return data?.data;
}

export async function toggleFavorite(bookId) {
  const { data } = await axiosInstance.post(`/favorites/${bookId}`);
  return data || {};
}
