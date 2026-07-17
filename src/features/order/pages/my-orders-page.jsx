import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

const paymentConfig = {
  paid: {
    label: "Paid",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  unpaid: {
    label: "Unpaid",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
};

export default function MyOrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["my-orders", page],
    queryFn: () => fetchOrders({ page, limit: 10 }),
  });

  const orders = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const cancelMutation = useMutation({
    mutationFn: (id) =>
      axiosInstance.put(`/orders/${id}`, { status: "cancelled" }),
    onSuccess: () => {
      toast.success("Order cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
    onError: () => toast.error("Failed to cancel order"),
  });

  const handleCheckout = async (orderId) => {
    try {
      const { data } = await axiosInstance.post(`/checkout/${orderId}`);
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch {
      toast.error("Failed to initiate payment");
    }
  };

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
        <Heading title="My Orders" subtitle="View and manage your orders" />
        <Empty className="mt-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShoppingBag />
            </EmptyMedia>
            <EmptyTitle>No orders yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t placed any orders. Browse our collection to get
              started.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <a href="/books">Browse Books</a>
            </Button>
          </EmptyContent>
        </Empty>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <Heading title="My Orders" subtitle="View and manage your orders" />

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead className="hidden sm:table-cell">Order Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const status = statusConfig[order.status] ?? statusConfig.pending;
              const payment =
                paymentConfig[order.paymentStatus] ?? paymentConfig.unpaid;

              return (
                <TableRow key={order._id}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {order.bookTitle ?? order.book?.title ?? "Unknown Book"}
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
                  <TableCell>
                    <Badge variant="outline" className={payment.className}>
                      {payment.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {order.status === "pending" &&
                        order.paymentStatus === "unpaid" && (
                          <Button
                            size="sm"
                            onClick={() => handleCheckout(order._id)}
                          >
                            <CreditCard className="size-3.5" />
                            Pay Now
                          </Button>
                        )}
                      {order.status === "pending" && (
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={<Button size="sm" variant="destructive" />}
                          >
                            <XCircle className="size-3.5" />
                            Cancel
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. The order will be
                                permanently cancelled.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Keep Order</AlertDialogCancel>
                              <AlertDialogAction
                                variant="destructive"
                                onClick={() => cancelMutation.mutate(order._id)}
                              >
                                Yes, Cancel
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
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
