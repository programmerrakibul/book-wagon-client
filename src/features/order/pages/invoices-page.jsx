import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Receipt } from "lucide-react";
import { useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { fetchInvoices } from "@/features/order/services/orders.service";

export default function InvoicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["invoices", page],
    queryFn: () => fetchInvoices({ page, limit: 10 }),
  });

  const invoices = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const totalSpent = invoices.reduce(
    (sum, inv) => sum + Number(inv.amount ?? inv.totalPrice ?? 0),
    0,
  );

  if (isLoading) {
    return (
      <Container className="py-10 flex items-center justify-center min-h-[50vh]">
        <Spinner className="size-8" />
      </Container>
    );
  }

  if (!invoices.length) {
    return (
      <Container className="py-10">
        <Heading title="Invoices" subtitle="View your payment history" />
        <Empty className="mt-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Receipt />
            </EmptyMedia>
            <EmptyTitle>No invoices yet</EmptyTitle>
            <EmptyDescription>
              Your payment invoices will appear here once you make a purchase.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent />
        </Empty>
      </Container>
    );
  }

  return (
    <Container className="py-10">
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
              <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead className="hidden sm:table-cell">
                Transaction ID
              </TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice._id}>
                <TableCell className="font-medium max-w-[200px] truncate">
                  {invoice.bookTitle ?? invoice.book?.title ?? "Unknown Book"}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground font-mono text-xs">
                  {invoice.transactionId ?? invoice._id ?? "—"}
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right font-medium">
                  $
                  {Number(invoice.amount ?? invoice.totalPrice ?? 0).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
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
