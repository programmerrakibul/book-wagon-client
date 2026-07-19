import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/App";
import {
  checkoutOrder,
  createOrder,
  deleteOrder,
  fetchInvoices,
  fetchOrders,
  updateOrderStatus,
} from "@/features/order/services/orders.service";
import { getAxiosError } from "@/utils/error";

export const orderKeys = {
  all: ["orders"],
  list: (params) => ["orders", "list", params],
  detail: (id) => ["orders", "detail", id],
  invoices: (params) => ["invoices", params],
};

export function useOrders(params) {
  return useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => fetchOrders(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useInvoices(params) {
  return useQuery({
    queryKey: orderKeys.invoices(params),
    queryFn: () => fetchInvoices(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Order placed successfully!");
        queryClient.invalidateQueries({ queryKey: orderKeys.all });
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      const msg = getAxiosError(error);
      toast.error(msg || "Failed to place order.");
    },
  });
}

export function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: orderKeys.all });
        toast.success("Order status updated!");
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      const msg = getAxiosError(error);
      toast.error(msg || "Failed to update order status.");
    },
  });
}

export function useDeleteOrder() {
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: orderKeys.all });
        toast.success("Order deleted successfully!");
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      const msg = getAxiosError(error);
      toast.error(msg || "Failed to delete order.");
    },
  });
}

export function useCheckout() {
  return useMutation({
    mutationFn: (orderId) => checkoutOrder(orderId),
    onError: (error) => {
      const msg = getAxiosError(error);
      toast.error(msg || "Failed to initiate payment.");
    },
  });
}
