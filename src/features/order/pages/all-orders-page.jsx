import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchOrders } from "@/features/order/services/orders.service";
import axiosInstance from "@/lib/axios";

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  shipped: {
    label: "Shipped",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export default function AllOrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["all-orders", page],
    queryFn: () => fetchOrders({ page, limit: 10 }),
  });

  const orders = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosInstance.put(`/orders/${id}`, { status }),
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
    },
    onError: () => toast.error("Failed to update order status"),
  });

  if (isLoading) {
    return (
      <Container className="py-10 flex items-center justify-center min-h-[50vh]">
        <Spinner className="size-8" />
      </Container>
    );
  }

  if (!orders.length) {
    return (
      <Container className="py-10">
        <Heading title="All Orders" subtitle="Manage customer orders" />
        <Empty className="mt-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
                <path d="M15 3v4a2 2 0 0 0 2 2h4" />
              </svg>
            </EmptyMedia>
            <EmptyTitle>No orders found</EmptyTitle>
            <EmptyDescription>
              There are no orders to display at this time.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent />
        </Empty>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <Heading title="All Orders" subtitle="Manage customer orders" />

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead className="hidden md:table-cell">Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Order Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const status = statusConfig[order.status] ?? statusConfig.pending;

              return (
                <TableRow key={order._id}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {order.bookTitle ?? order.book?.title ?? "Unknown Book"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {order.userEmail ?? order.user?.email ?? "—"}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${Number(order.totalPrice ?? order.price ?? 0).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={status.className}>
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        statusMutation.mutate({
                          id: order._id,
                          status: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setSearchParams({ page: String(page - 1) })}
          >
            <ChevronLeft className="size-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setSearchParams({ page: String(page + 1) })}
          >
            Next
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </Container>
  );
}
