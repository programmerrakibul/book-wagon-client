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

import { useAdminDashboard } from "@/features/dashboard/hooks/use-dashboard";
import {
  OrderStatusConfig,
  PaymentStatusConfig,
  getStatusBadge,
} from "@/features/shared/constants/statuses";
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
  const recentOrders = data?.recentOrders ?? [];
  const topBooks = data?.topBooks ?? [];
  const orderStatusDistribution = data?.orderStatusDistribution ?? {};
  const chartData = data?.userGrowthChartData ?? [];
  const recentUsers = data?.recentUsers ?? [];

  const orderStatusData = Object.entries(orderStatusDistribution).map(
    ([status, count]) => ({ status, count }),
  );

  return (
    <Container className="py-6 sm:py-8 lg:py-10 space-y-8">
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
          title="Success Rate"
          value={`${Number(stats.successRate ?? 0).toFixed(1)}%`}
          icon={<Activity className="size-5" />}
          description="Order completion"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Readers"
          value={stats.totalReaders ?? 0}
          icon={<Users className="size-5" />}
          description="Regular users"
        />
        <MetricCard
          title="Librarians"
          value={stats.totalLibrarians ?? 0}
          icon={<Star className="size-5" />}
          description="Staff members"
        />
        <MetricCard
          title="Active Users"
          value={stats.activeUsers ?? 0}
          icon={<TrendingUp className="size-5" />}
          description="Active this month"
        />
        <MetricCard
          title="Wishlist Items"
          value={stats.totalWishlistItems ?? 0}
          icon={<Heart className="size-5" />}
          description="Total wishlisted"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="monthName" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="totalUsers" fill="var(--color-primary, #3b82f6)" radius={[4, 4, 0, 0]} />
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
            {orderStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ status, count }) => `${status}: ${count}`}
                  >
                    {orderStatusData.map((_, index) => (
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
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead className="hidden sm:table-cell">Customer</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => {
                      const s = getStatusBadge(order.status, OrderStatusConfig);
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium truncate max-w-[150px]">
                            {order.bookName ?? "—"}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground truncate max-w-[120px]">
                            {order.customerEmail ?? "—"}
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

      {recentUsers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Email</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((u, index) => {
                    const rc = getStatusBadge(u.role, {
                      admin: { label: "Admin", className: "bg-red-100 text-red-800 border-red-200" },
                      librarian: { label: "Librarian", className: "bg-blue-100 text-blue-800 border-blue-200" },
                      user: { label: "User", className: "bg-green-100 text-green-800 border-green-200" },
                    });
                    return (
                      <TableRow key={u.email ?? index}>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
                          {u.email}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={rc.className}>
                            {rc.label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
