import { useCallback } from "react";
import { useSearchParams } from "react-router";

import {
  OrderStatusConfig,
  getStatusBadge,
} from "@/features/shared/constants/statuses";
import { useOrders, useUpdateOrderStatus } from "@/features/order/hooks/use-orders";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { SkeletonLayout } from "@/components/shared/skeleton-layout";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/shared/data-table";

const ORDER_STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function AllOrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useOrders({ page, limit: 10 });
  const statusMutation = useUpdateOrderStatus();

  const orders = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const handlePageChange = useCallback(
    (p) => setSearchParams({ page: String(p) }),
    [setSearchParams],
  );

  const columns = [
    {
      key: "bookName",
      header: "Book Title",
      cell: (row) => (
        <span className="font-medium max-w-[200px] truncate block">
          {row.bookId?.name ?? "Unknown Book"}
        </span>
      ),
    },
    {
      key: "customerEmail",
      header: "Customer",
      className: "hidden md:table-cell",
      cell: (row) => (
        <span className="text-muted-foreground">
          {row.customerId?.email ?? "—"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Order Date",
      className: "hidden sm:table-cell",
      cell: (row) => (
        <span className="text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "totalPrice",
      header: "Price",
      cell: (row) => (
        <span className="font-medium">
          ${Number(row.totalPrice ?? 0).toFixed(2)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => {
        const s = getStatusBadge(row.status, OrderStatusConfig);
        return (
          <Badge variant="outline" className={s.className}>
            {s.label}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right min-w-[140px]",
      cell: (row) => (
        <Select
          value={row.status}
          onValueChange={(value) =>
            statusMutation.mutate({ id: row._id, status: value })
          }
          disabled={statusMutation.isPending}
        >
          <SelectTrigger className="h-8 w-[130px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ORDER_STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
  ];

  const renderCard = (row) => {
    const s = getStatusBadge(row.status, OrderStatusConfig);
    return (
      <div className="flex items-center justify-between rounded-xl border bg-card p-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {row.bookId?.name ?? "Unknown Book"}
          </p>
          <p className="text-xs text-muted-foreground">
            {row.customerId?.email ?? "—"}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline" className={s.className}>
              {s.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(row.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="ml-4 flex flex-col items-end gap-2">
          <span className="text-sm font-medium">
            ${Number(row.totalPrice ?? 0).toFixed(2)}
          </span>
          <Select
            value={row.status}
            onValueChange={(value) =>
              statusMutation.mutate({ id: row._id, status: value })
            }
            disabled={statusMutation.isPending}
          >
            <SelectTrigger className="h-8 w-[120px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="All Orders" subtitle="Manage customer orders" />
        <div className="mt-6">
          <SkeletonLayout variant="table" count={10} />
        </div>
      </Container>
    );
  }

  if (!orders.length) {
    return (
      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="All Orders" subtitle="Manage customer orders" />
        <div className="mt-8">
          <EmptyState
            title="No orders found"
            description="There are no orders to display at this time."
          />
        </div>
      </Container>
    );
  }

  return (
    <>
      <title>All Orders | BookWagon</title>

      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="All Orders" subtitle="Manage customer orders" />

        <div className="mt-6">
          <DataTable
            columns={columns}
            data={orders}
            renderCard={renderCard}
          />
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
}
