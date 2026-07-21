import { useCallback } from "react";
import { useSearchParams } from "react-router";

import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { SkeletonLayout } from "@/components/shared/skeleton-layout";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { useOrders } from "@/features/order/hooks/use-orders";
import {
  OrderStatusConfig,
  PaymentStatusConfig,
  getStatusBadge,
} from "@/features/shared/constants/statuses";

export default function AllOrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useOrders({ page, limit: 10, isLibrarian: true });

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
      key: "paymentStatus",
      header: "Payment Status",
      cell: (row) => {
        const s = getStatusBadge(row.paymentStatus, PaymentStatusConfig);

        return (
          <Badge variant="outline" className={s.className}>
            {s.label}
          </Badge>
        );
      },
    },
  ];

  const renderCard = (row) => {
    const s = getStatusBadge(row.status, OrderStatusConfig);
    const ps = getStatusBadge(row.paymentStatus, PaymentStatusConfig);

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
            <Badge variant="outline" className={ps.className}>
              {ps.label}
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
          <DataTable columns={columns} data={orders} renderCard={renderCard} />
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
