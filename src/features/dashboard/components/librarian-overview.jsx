import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  DollarSign,
  Clock,
  TrendingUp,
} from "lucide-react";

import axiosInstance from "@/lib/axios";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MetricCard } from "@/features/dashboard/components/metric-card";

function useLibrarianDashboard() {
  return useQuery({
    queryKey: ["dashboard", "librarian"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/dashboard/librarian");
      return data?.data ?? data ?? {};
    },
  });
}

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
  const topBooks = data?.topBooks ?? [];

  return (
    <Container className="py-10 space-y-8">
      <Heading title="Librarian Dashboard" subtitle="Manage your books and orders" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="My Books"
          value={stats.totalBooks ?? 0}
          icon={<BookOpen className="size-5" />}
          description="Books in your collection"
        />
        <MetricCard
          title="Total Sales"
          value={stats.totalSales ?? 0}
          icon={<DollarSign className="size-5" />}
          description="All time sales"
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
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium truncate max-w-[140px]">
                        {order.bookTitle ?? order.book?.title ?? "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground truncate max-w-[120px]">
                        {order.userEmail ?? order.user?.email ?? "—"}
                      </TableCell>
                      <TableCell>
                        ${Number(order.totalPrice ?? order.price ?? 0).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.status ?? "pending"}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                    key={book._id ?? index}
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
                      {book.soldCount ?? book.sales ?? 0} sold
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
  );
}
