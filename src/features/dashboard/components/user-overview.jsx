import {
  BookAlertIcon,
  BookOpen,
  DollarSign,
  Heart,
  ShoppingCart,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
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
import { DashboardSkeleton } from "@/features/dashboard/components/dashboard-skeleton";
import { useUserDashboard } from "@/features/dashboard/hooks/use-dashboard";
import {
  PaymentStatusConfig,
  getStatusBadge,
} from "@/features/shared/constants/statuses";
import { getPrice } from "@/utils/utils";
import { BarChartCard } from "./bar-chart-card";
import { MetricCard } from "./metric-card";

const userChartConfig = {
  amount: {
    label: "Spending",
    color: "var(--color-chart-1, #3b82f6)",
  },
};

export default function UserOverview() {
  const { data = {}, isLoading } = useUserDashboard();

  const stats = data?.stats ?? {};
  const recentOrders = data?.recentOrders ?? [];
  const wishlist = data?.wishlist ?? [];
  const chartData = data?.chartData ?? [];

  const metricsData = [
    {
      id: "totalOrders",
      title: "Total Orders",
      value: stats.totalOrders ?? 0,
      icon: ShoppingCart,
      description: "Orders placed",
    },
    {
      id: "booksPurchased",
      title: "Books Purchased",
      value: stats.booksPurchased ?? 0,
      icon: BookOpen,
      description: `Books you've bought`,
    },

    {
      id: "totalSpent",
      title: "Total Spent",
      value: `৳${stats.totalSpent ?? 0}`,
      icon: DollarSign,
      description: "Total amount spent",
    },
    {
      id: "wishlistItems",
      title: "Wishlist Items",
      value: stats.wishlistItems ?? 0,
      icon: Heart,
      description: `Books you're interested in`,
    },
  ];

  return (
    <>
      <title>Overview | BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10 space-y-8">
        <Container className="space-y-6">
          <Heading
            title="My Dashboard"
            subtitle="Your reading activity overview"
          />

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {metricsData.map((metric) => (
              <MetricCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                icon={<metric.icon className="size-5" />}
                description={metric.description}
                isLoading={isLoading}
              />
            ))}
          </div>

          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              <BarChartCard
                title="Monthly Spending"
                data={chartData}
                config={userChartConfig}
                dataKey="amount"
                nameKey="month"
              />

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
                                <TableHead>Payment</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {recentOrders.map((order) => {
                                const p = getStatusBadge(
                                  order.paymentStatus,
                                  PaymentStatusConfig,
                                );
                                return (
                                  <TableRow key={order.id}>
                                    <TableCell className="font-medium truncate max-w-[150px]">
                                      {order.bookName ?? "—"}
                                    </TableCell>
                                    <TableCell>
                                      <Badge
                                        variant="outline"
                                        className={p.className}
                                      >
                                        {p.label}
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
                            const p = getStatusBadge(
                              order.paymentStatus,
                              PaymentStatusConfig,
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
                                </div>
                                <Badge
                                  variant="outline"
                                  className={p.className}
                                >
                                  {p.label}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <EmptyState
                        icon={BookAlertIcon}
                        title="No recent orders"
                        description="You haven't made any recent orders yet."
                      />
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {wishlist.length > 0 ? (
                      <div className="space-y-3">
                        {wishlist.map((item, index) => (
                          <div
                            key={item._id ?? index}
                            className="flex items-center justify-between gap-3 rounded-lg border p-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={item.photoUrl ?? ""}
                                alt={item.name ?? "Book"}
                                className="h-10 w-8 shrink-0 rounded object-cover"
                              />
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                  {item.name ?? "Unknown"}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                  {item.author ?? "—"}
                                </p>
                              </div>
                            </div>
                            <span className="text-sm font-medium shrink-0">
                              ৳{getPrice(item)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon={Heart}
                        title="Your wishlist is empty"
                        description="Try adding some books to your wishlist."
                        action={{
                          label: "Browse books",
                          to: "/books",
                        }}
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
