import axiosInstance from "@/lib/axios";

export async function fetchOrders(params) {
  const { data } = await axiosInstance.get("/orders", { params });
  return data ?? {};
}

export async function fetchOrder(id) {
  const { data } = await axiosInstance.get(`/orders/${id}`);
  return data?.data ?? {};
}

export async function createOrder(payload) {
  const { data } = await axiosInstance.post("/orders", payload);
  return data || {};
}

export async function updateOrderStatus(id, status) {
  const { data } = await axiosInstance.patch(`/orders/${id}/status`, {
    status,
  });
  return data || {};
}

export async function deleteOrder(id) {
  const { data } = await axiosInstance.delete(`/orders/${id}`);
  return data || {};
}

export async function checkoutOrder(orderID) {
  const { data } = await axiosInstance.post(`/orders/checkout/${orderID}`);
  return data?.data ?? data ?? {};
}

export async function fetchInvoices(params) {
  const { data } = await axiosInstance.get("/payments", { params });
  return data ?? {};
}
