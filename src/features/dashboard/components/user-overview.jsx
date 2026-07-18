import {
  BookOpen,
  Heart,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

import { useUserDashboard } from "@/features/dashboard/hooks/use-dashboard";
import {
  OrderStatusConfig,
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
  const wishlist = data?.wishlist ?? [];

  return (
    <Container className="py-6 sm:py-8 lg:py-10 space-y-8">
      <Heading title="My Dashboard" subtitle="Your reading activity overview" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Orders"
          value={stats.totalOrders ?? 0}
          icon={<ShoppingCart className="size-5" />}
          description="Orders placed"
        />
        <MetricCard
          title="Books Purchased"
          value={stats.booksPurchased ?? 0}
          icon={<BookOpen className="size-5" />}
          description="Books you've bought"
        />
        <MetricCard
          title="Total Spent"
          value={`$${Number(stats.totalSpent ?? 0).toFixed(2)}`}
          icon={<DollarSign className="size-5" />}
          description="Total amount spent"
        />
        <MetricCard
          title="Wishlist Items"
          value={stats.wishlistItems ?? 0}
          icon={<Heart className="size-5" />}
          description="Books you're interested in"
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
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => {
                      const p = getStatusBadge(order.paymentStatus, {
                        paid: { label: "Paid", className: "bg-green-100 text-green-800 border-green-200" },
                        unpaid: { label: "Unpaid", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
                      });
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium truncate max-w-[150px]">
                            {order.bookName ?? "—"}
                          </TableCell>
                          <TableCell>
                            ${Number(order.amount ?? 0).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={p.className}>
                              {p.label}
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
                No orders yet
              </p>
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
                    key={item.bookId ?? index}
                    className="flex items-center justify-between gap-3 rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image ?? ""}
                        alt={item.title ?? "Book"}
                        className="h-10 w-8 shrink-0 rounded object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {item.title ?? "Unknown"}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {item.author ?? "—"}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium shrink-0">
                      ${Number(item.price ?? 0).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No wishlist items yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
