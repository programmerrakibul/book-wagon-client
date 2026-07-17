import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../services/orders.service";
export function useOrders(params) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => fetchOrders(params),
    staleTime: 30_000,
  });
}
