import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Users,
  ShoppingCart,
  Activity,
  Heart,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

const PIE_COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

function useAdminDashboard() {
  return useQuery({
    queryKey: ["dashboard", "admin"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/dashboard/admin");
      return data?.data ?? data ?? {};
    },
  });
}

export default function AdminOverview() {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) {
    return (
      <Container className="py-10 flex items-center justify-center min-h-[50vh]">
        <Spinner className="size-8" />
      </Container>
    );
  }

  const stats = data?.stats ?? {};
  const userStats = data?.userStats ?? {};
  const recentOrders = data?.recentOrders ?? [];
  const topBooks = data?.topBooks ?? [];
  const ordersByStatus = data?.ordersByStatus ?? [];
  const monthlyOrders = data?.monthlyOrders ?? [];

  return (
    <Container className="py-10 space-y-8">
      <Heading title="Admin Dashboard" subtitle="Platform overview and analytics" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Books"
          value={stats.totalBooks ?? 0}
          icon={<BookOpen className="size-5" />}
          description="Books in the library"
        />
        <MetricCard
          title="Total Users"
          value={stats.totalUsers ?? 0}
          icon={<Users className="size-5" />}
          description="Registered users"
        />
        <MetricCard
          title="Total Orders"
          value={stats.totalOrders ?? 0}
          icon={<ShoppingCart className="size-5" />}
          description="All time orders"
        />
        <MetricCard
          title="Platform Health"
          value={stats.platformHealth ?? "Good"}
          icon={<Activity className="size-5" />}
          description="System status"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Readers"
          value={userStats.readers ?? 0}
          icon={<Users className="size-5" />}
          description="Regular users"
        />
        <MetricCard
          title="Librarians"
          value={userStats.librarians ?? 0}
          icon={<Star className="size-5" />}
          description="Staff members"
        />
        <MetricCard
          title="Active Users"
          value={userStats.activeUsers ?? 0}
          icon={<TrendingUp className="size-5" />}
          description="Active this month"
        />
        <MetricCard
          title="Wishlist Items"
          value={userStats.wishlistItems ?? 0}
          icon={<Heart className="size-5" />}
          description="Total wishlisted"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyOrders.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyOrders}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="count" fill="var(--color-primary, #3b82f6)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
                No chart data available
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            {ordersByStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ordersByStatus}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ status, count }) => `${status}: ${count}`}
                  >
                    {ordersByStatus.map((_, index) => (
                      <Cell
                        key={index}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
                No chart data available
              </p>
            )}
          </CardContent>
        </Card>
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
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium truncate max-w-[150px]">
                        {order.bookTitle ?? order.book?.title ?? "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground truncate max-w-[120px]">
                        {order.userEmail ?? order.user?.email ?? "—"}
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Platform Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-xl font-bold">
                ${Number(stats.totalRevenue ?? 0).toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              <p className="text-xl font-bold">
                ${Number(stats.avgOrderValue ?? 0).toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-xl font-bold">
                {Number(stats.conversionRate ?? 0).toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
