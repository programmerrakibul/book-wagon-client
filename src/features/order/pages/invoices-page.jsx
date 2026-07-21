import { Receipt } from "lucide-react";
import { useCallback } from "react";
import { useSearchParams } from "react-router";

import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { SkeletonLayout } from "@/components/shared/skeleton-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useInvoices } from "@/features/order/hooks/use-orders";

export default function InvoicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data = {}, isLoading } = useInvoices({ page, limit: 10 });

  const invoices = data?.data || [];
  const totalSpent = data?.totalSpent ?? 0;
  const totalPages = data?.pagination?.totalPages ?? 1;

  const handlePageChange = useCallback(
    (p) => setSearchParams({ page: String(p) }),
    [setSearchParams],
  );

  const columns = [
    {
      key: "bookName",
      header: "Book",
      cell: (row) => (
        <span className="font-medium max-w-[200px] truncate block">
          {row.bookId?.name ?? "Unknown Book"}
        </span>
      ),
    },
    {
      key: "transactionId",
      header: "Transaction ID",
      className: "hidden sm:table-cell",
      cell: (row) => (
        <span className="text-muted-foreground font-mono text-xs">
          {row.transactionId ?? "—"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      className: "hidden md:table-cell",
      cell: (row) => (
        <span className="text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "totalPrice",
      header: "Amount",
      cell: (row) => (
        <span className="font-medium text-right">
          ৳{row.totalPrice.toLocaleString()}
        </span>
      ),
    },
  ];

  const renderCard = (row) => (
    <div className="flex items-center justify-between rounded-xl border bg-card p-4">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {row.bookId?.name ?? "Unknown Book"}
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          {row.transactionId?.trim() ?? "—"}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(row.createdAt).toLocaleDateString()}
        </p>
      </div>
      <span className="ml-4 text-sm font-medium">
        ৳{row.totalPrice.toLocaleString()}
      </span>
    </div>
  );

  return (
    <>
      <title>Invoices | BookWagon</title>

      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="Invoices" subtitle="View your payment history" />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Receipt className="size-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">
                  ৳
                  <NumberTicker
                    value={totalSpent}
                    decimalPlaces={2}
                    startValue={parseFloat((totalSpent * 0.98).toFixed(2))}
                  />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="mt-6">
            <SkeletonLayout variant="table" count={10} />
          </div>
        ) : invoices.length > 0 ? (
          <>
            <div className="mt-6">
              <DataTable
                columns={columns}
                data={invoices}
                renderCard={renderCard}
              />
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="mt-8">
            <EmptyState
              icon={Receipt}
              title="No invoices yet"
              description="Your payment invoices will appear here once you make a purchase."
            />
          </div>
        )}
      </Container>
    </>
  );
}
