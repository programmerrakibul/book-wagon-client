import { BookOpen, Clock, DollarSign, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
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
import { MetricCard } from "@/features/dashboard/components/metric-card";
import { useLibrarianDashboard } from "@/features/dashboard/hooks/use-dashboard";
import {
  OrderStatusConfig,
  getStatusBadge,
} from "@/features/shared/constants/statuses";

export default function LibrarianOverview() {
  const { data, isLoading } = useLibrarianDashboard();

  if (isLoading) {
    return (
      <Container className="py-10 flex items-center justify-center min-h-[50vh]">
        <Spinner className="size-8" />
      </Container>
    );
  }

  const stats = data?.stats ?? {};
  const recentOrders = data?.recentOrders ?? [];
  const topBooks = data?.myTopBooks ?? [];

  return (
    <>
      <title>Librarian Dashboard | BookWagon</title>

      <Container className="py-6 sm:py-8 lg:py-10 space-y-8">
        <Heading
          title="Librarian Dashboard"
          subtitle="Manage your books and orders"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="My Books"
            value={stats.myBooks ?? 0}
            icon={<BookOpen className="size-5" />}
            description="Books in your collection"
          />
          <MetricCard
            title="Total Orders"
            value={stats.totalOrders ?? 0}
            icon={<DollarSign className="size-5" />}
            description="All time orders"
          />
          <MetricCard
            title="Pending Orders"
            value={stats.pendingOrders ?? 0}
            icon={<Clock className="size-5" />}
            description="Awaiting fulfillment"
          />
          <MetricCard
            title="Revenue"
            value={`$${Number(stats.totalRevenue ?? 0).toFixed(2)}`}
            icon={<TrendingUp className="size-5" />}
            description="Total earned"
            trend={stats.revenueTrend}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Customer
                        </TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => {
                        const s = getStatusBadge(
                          order.status,
                          OrderStatusConfig,
                        );
                        return (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium truncate max-w-[140px]">
                              {order.bookName ?? "—"}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-muted-foreground truncate max-w-[120px]">
                              {order.customerEmail ?? "—"}
                            </TableCell>
                            <TableCell>
                              ${Number(order.amount ?? 0).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={s.className}>
                                {s.label}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No recent orders
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Selling Books</CardTitle>
            </CardHeader>
            <CardContent>
              {topBooks.length > 0 ? (
                <div className="space-y-3">
                  {topBooks.map((book, index) => (
                    <div
                      key={book.bookId ?? index}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className="text-sm truncate">
                          {book.title ?? "Unknown"}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground shrink-0">
                        {book.sales ?? 0} sold
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No data available
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}
