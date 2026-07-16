import axiosInstance from "@/lib/axios";
export async function fetchWishlist(params) { const { data } = await axiosInstance.get("/favorites/books", { params }); return data ?? {}; }
