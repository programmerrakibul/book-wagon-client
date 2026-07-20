import { CopyIcon, ShoppingBag } from "lucide-react";
import { useCallback } from "react";
import { useSearchParams } from "react-router";

import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { SkeletonLayout } from "@/components/shared/skeleton-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { useOrders } from "@/features/order/hooks/use-orders";
import {
  OrderStatusConfig,
  PaymentStatusConfig,
  getStatusBadge,
} from "@/features/shared/constants/statuses";
import { copyToClipboard } from "@/utils/utils";
import RowActions from "../components/row-actions";

export default function MyOrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useOrders({ page, limit: 10 });

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
      key: "transaction ID",
      header: "Transaction ID",
      cell: (row) => {
        const txId = row.transactionId?.trim();

        if (!txId) {
          return <span className="text-muted-foreground">—</span>;
        }

        return (
          <div className="flex items-center gap-2 group max-w-[200px]">
            <span className="font-medium truncate block flex-1">{txId}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              onClick={() => copyToClipboard(txId)}
            >
              <CopyIcon className="h-3.5 w-3.5" />
            </Button>
          </div>
        );
      },
    },
    {
      key: "createdAt",
      header: "Order Date",
      className: "hidden sm:table-cell",
      cell: (row) => (
        <span className="text-muted-foreground capitalize">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      cell: (row) => (
        <span className="font-medium">
          ৳{row.price}×{row.quantity}
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
      header: "Payment",
      cell: (row) => {
        const p = getStatusBadge(row.paymentStatus, PaymentStatusConfig);
        return (
          <Badge variant="outline" className={p.className}>
            {p.label}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (row) => <RowActions row={row} />,
    },
  ];

  const renderCard = (row) => {
    const s = getStatusBadge(row.status, OrderStatusConfig);
    const p = getStatusBadge(row.paymentStatus, PaymentStatusConfig);
    return (
      <div className="flex items-center justify-between rounded-xl border bg-card p-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {row.bookId?.name ?? "Unknown Book"}
          </p>
          <p className="text-sm text-muted-foreground truncate flex items-center gap-2">
            {row.transactionId?.trim() ? (
              <>
                <span className="truncate">{row.transactionId.trim()}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard(row.transactionId)}
                >
                  <CopyIcon className="h-3.5 w-3.5" />
                </Button>
              </>
            ) : (
              "—"
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {new Date(row.createdAt).toLocaleDateString()}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outline" className={s.className}>
              {s.label}
            </Badge>
            <Badge variant="outline" className={p.className}>
              {p.label}
            </Badge>
          </div>
        </div>
        <div className="ml-4 flex flex-col items-end gap-2">
          <span className="text-sm font-medium">
            ৳{row.price}×{row.quantity}
          </span>
          <RowActions row={row} />
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="My Orders" subtitle="View and manage your orders" />
        <div className="mt-6">
          <SkeletonLayout variant="table" count={10} />
        </div>
      </Container>
    );
  }

  if (!orders.length) {
    return (
      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="My Orders" subtitle="View and manage your orders" />
        <div className="mt-8">
          <EmptyState
            icon={ShoppingBag}
            title="No orders yet"
            description="You haven't placed any orders. Browse our collection to get started."
            action={{ label: "Browse Books", to: "/books" }}
          />
        </div>
      </Container>
    );
  }

  return (
    <>
      <title>My Orders | BookWagon</title>

      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="My Orders" subtitle="View and manage your orders" />

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
