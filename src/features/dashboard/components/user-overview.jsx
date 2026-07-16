import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Heart,
  DollarSign,
  ShoppingCart,
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

function useUserDashboard() {
  return useQuery({
    queryKey: ["dashboard", "user"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/dashboard/user");
      return data?.data ?? data ?? {};
    },
  });
}

export default function UserOverview() {
  const { data, isLoading } = useUserDashboard();

  if (isLoading) {
    return (
      <Container className="py-10 flex items-center justify-center min-h-[50vh]">
        <Spinner className="size-8" />
      </Container>
    );
  }

  const stats = data?.stats ?? {};
  const recentOrders = data?.recentOrders ?? [];
  const readingSummary = data?.readingSummary ?? {};

  return (
    <Container className="py-10 space-y-8">
      <Heading title="My Dashboard" subtitle="Your reading activity overview" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Books Read"
          value={stats.booksRead ?? 0}
          icon={<BookOpen className="size-5" />}
          description="Books you've purchased"
        />
        <MetricCard
          title="Wishlist Items"
          value={stats.wishlistItems ?? 0}
          icon={<Heart className="size-5" />}
          description="Books you're interested in"
        />
        <MetricCard
          title="Total Spent"
          value={`$${Number(stats.totalSpent ?? 0).toFixed(2)}`}
          icon={<DollarSign className="size-5" />}
          description="Total amount spent"
        />
        <MetricCard
          title="Orders"
          value={stats.totalOrders ?? 0}
          icon={<ShoppingCart className="size-5" />}
          description="Total orders placed"
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
                    <TableHead>Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium truncate max-w-[150px]">
                        {order.bookTitle ?? order.book?.title ?? "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
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
                No orders yet
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reading Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Favorite Genre</p>
                  <p className="text-sm font-medium">
                    {readingSummary.favoriteGenre ?? "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Books This Month</p>
                  <p className="text-sm font-medium">
                    {readingSummary.booksThisMonth ?? 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pages Read</p>
                  <p className="text-sm font-medium">
                    {readingSummary.totalPagesRead ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
