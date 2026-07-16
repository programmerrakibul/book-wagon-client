import axiosInstance from "@/lib/axios";

export async function fetchOrders(params) { const { data } = await axiosInstance.get("/orders", { params }); return data ?? {}; }
export async function fetchInvoices(params) { const { data } = await axiosInstance.get("/payments", { params }); return data ?? {}; }
