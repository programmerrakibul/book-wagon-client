import {
  Activity,
  BookOpen,
  Heart,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChartCard } from "@/features/dashboard/components/bar-chart-card";
import { DashboardSkeleton } from "@/features/dashboard/components/dashboard-skeleton";
import { MetricCard } from "@/features/dashboard/components/metric-card";
import { PieChartCard } from "@/features/dashboard/components/pie-chart-card";
import { useAdminDashboard } from "@/features/dashboard/hooks/use-dashboard";
import {
  OrderStatusConfig,
  UserRoleConfig,
  getStatusBadge,
} from "@/features/shared/constants/statuses";

const userGrowthChartConfig = {
  totalUsers: {
    label: "Total Users",
    color: "var(--color-chart-1, #3b82f6)",
  },
};

export default function AdminOverview() {
  const { data = {}, isLoading } = useAdminDashboard();

  const stats = data?.stats ?? {};
  const recentOrders = data?.recentOrders ?? [];
  const topBooks = data?.topBooks ?? [];
  const orderStatusDistribution = data?.orderStatusDistribution ?? {};
  const chartData = data?.userGrowthChartData ?? [];
  const recentUsers = data?.recentUsers ?? [];

  const orderStatusData = Object.entries(orderStatusDistribution).map(
    ([status, count]) => ({
      status,
      count,
    }),
  );

  const orderStatusChartConfig = Object.fromEntries(
    Object.entries(orderStatusDistribution).map(([status], i) => [
      status,
      {
        label: status,
        color: `var(--color-chart-${(i % 5) + 1})`,
      },
    ]),
  );

  const metricCards = [
    {
      id: "totalBooks",
      title: "Total Books",
      value: stats.totalBooks ?? 0,
      icon: BookOpen,
      description: "Books in the library",
    },
    {
      id: "totalUsers",
      title: "Total Users",
      value: stats.totalUsers ?? 0,
      icon: Users,
      description: "Registered users",
    },
    {
      id: "totalOrders",
      title: "Total Orders",
      value: stats.totalOrders ?? 0,
      icon: ShoppingCart,
      description: "All time orders",
    },
    {
      id: "successRate",
      title: "Success Rate",
      value: `${Number(stats.successRate ?? 0).toFixed(1)}%`,
      icon: Activity,
      description: "Percentage of orders completed",
    },
    {
      id: "readers",
      title: "Readers",
      value: stats.totalReaders ?? 0,
      icon: Users,
      description: "Active readers",
    },
    {
      id: "librarians",
      title: "Librarians",
      value: stats.totalLibrarians ?? 0,
      icon: Star,
      description: "Staff members",
    },
    {
      id: "activeUsers",
      title: "Active Users",
      value: stats.activeUsers ?? 0,
      icon: TrendingUp,
      description: "Active this month",
    },
    {
      id: "totalWishlistItems",
      title: "Wishlist Items",
      value: stats.totalWishlistItems ?? 0,
      icon: Heart,
      description: "Total wishlisted",
    },
  ];

  return (
    <>
      <title>Admin Dashboard | BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container className="space-y-8">
          <Heading
            title="Admin Dashboard"
            subtitle="Platform overview and analytics"
          />

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {metricCards.map((card) => (
              <MetricCard
                key={card.id}
                title={card.title}
                value={card.value}
                icon={<card.icon className="size-5" />}
                description={card.description}
                isLoading={isLoading}
              />
            ))}
          </div>

          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <BarChartCard
                  title="User Growth"
                  data={chartData}
                  config={userGrowthChartConfig}
                  dataKey="totalUsers"
                  nameKey="monthName"
                />
                <PieChartCard
                  title="Orders by Status"
                  data={orderStatusData}
                  config={orderStatusChartConfig}
                />
              </div>

              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentOrders.length > 0 ? (
                      <>
                        <div className="rounded-lg border hidden sm:block">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Book</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                  Customer
                                </TableHead>
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
                                    <TableCell className="font-medium truncate max-w-[150px]">
                                      {order.bookName ?? "—"}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-muted-foreground truncate max-w-[120px]">
                                      {order.customerEmail ?? "—"}
                                    </TableCell>
                                    <TableCell>
                                      <Badge
                                        variant="outline"
                                        className={s.className}
                                      >
                                        {s.label}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                        <div className="space-y-3 sm:hidden">
                          {recentOrders.map((order) => {
                            const s = getStatusBadge(
                              order.status,
                              OrderStatusConfig,
                            );
                            return (
                              <div
                                key={order.id}
                                className="rounded-lg border p-3 space-y-2"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className="font-medium text-sm truncate">
                                    {order.bookName ?? "—"}
                                  </p>
                                  <Badge
                                    variant="outline"
                                    className={s.className}
                                  >
                                    {s.label}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground truncate">
                                  {order.customerEmail ?? "—"}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <p className="py-8 text-center text-sm text-muted-foreground">
                        No recent orders
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Top Selling Books
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {topBooks.length > 0 ? (
                      <div className="space-y-3">
                        {topBooks.map((book, index) => (
                          <div
                            key={book.bookId ?? book._id ?? index}
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
                    <div className="rounded-lg border hidden sm:block">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Email
                            </TableHead>
                            <TableHead>Role</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentUsers.map((u, index) => {
                            const rc = getStatusBadge(u.role, UserRoleConfig);
                            return (
                              <TableRow key={u.email ?? index}>
                                <TableCell className="font-medium">
                                  {u.name}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell text-muted-foreground">
                                  {u.email}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={rc.className}
                                  >
                                    {rc.label}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="space-y-3 sm:hidden">
                      {recentUsers.map((u, index) => {
                        const rc = getStatusBadge(u.role, UserRoleConfig);
                        return (
                          <div
                            key={u.email ?? index}
                            className="rounded-lg border p-3 space-y-1"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-medium text-sm">{u.name}</p>
                              <Badge variant="outline" className={rc.className}>
                                {rc.label}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {u.email}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
}
