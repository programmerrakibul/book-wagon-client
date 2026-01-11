import {
  FaBook,
  FaShoppingCart,
  FaDollarSign,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaTimesCircle,
  FaArrowUp,
  FaChartLine,
  FaStar,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";
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
import Container from "../../shared/Container/Container";
import Heading from "../../../components/Heading/Heading";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import useTheme from "../../../hooks/useTheme";
import { Link } from "react-router";

const LibrarianOverview = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const { theme } = useTheme();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: [user.email, "librarian-overview"],
    queryFn: async () => {
      const { data } = await secureAxios.get(
        `/dashboard/librarian/${user.email}`
      );

      return data?.data;
    },
  });

  const stats = dashboardData
    ? [
        {
          title: "My Books",
          value: dashboardData.stats.myBooks.toString(),
          change: `${dashboardData.stats.myBooks > 0 ? "+" : ""}${Math.round(
            (dashboardData.stats.myBooks / 100) * 5
          )}%`,
          icon: <FaBook />,
          color: "primary",
          description: "Total published books",
        },
        {
          title: "Total Orders",
          value: dashboardData.stats.totalOrders.toString(),
          change: `${dashboardData.stats.orderTrend > 0 ? "+" : ""}${
            dashboardData.stats.orderTrend
          }%`,
          trend: dashboardData.stats.orderTrend > 0 ? "up" : "down",
          icon: <FaShoppingCart />,
          color: "secondary",
          description: "All-time orders",
        },
        {
          title: "Total Revenue",
          value: `৳ ${dashboardData.stats.totalRevenue.toLocaleString()}`,
          change: `${dashboardData.stats.revenueTrend > 0 ? "+" : ""}${
            dashboardData.stats.revenueTrend
          }%`,
          trend: dashboardData.stats.revenueTrend > 0 ? "up" : "down",
          icon: <FaDollarSign />,
          color: "success",
          description: "Lifetime earnings",
        },
        {
          title: "Completed Orders",
          value: dashboardData.stats.completedOrders.toString(),
          change: `${
            Math.round(
              (dashboardData.stats.completedOrders /
                dashboardData.stats.totalOrders) *
                100
            ) || 0
          }% rate`,
          trend: "up",
          icon: <FaCheckCircle />,
          color: "accent",
          description: "Delivered successfully",
        },
      ]
    : [];

  const getStatusBadge = (status, paymentStatus) => {
    const badges = {
      delivered: {
        class: "badge-success",
        icon: <FaCheckCircle />,
        label: "Delivered",
      },
      shipped: {
        class: "badge-info",
        icon: <FaTruck />,
        label: "Shipped",
      },
      pending: {
        class: "badge-warning",
        icon: <FaClock />,
        label: "Pending",
      },
      cancelled: {
        class: "badge-error",
        icon: <FaTimesCircle />,
        label: "Cancelled",
      },
    };

    const paymentBadge =
      paymentStatus === "paid"
        ? { class: "badge-success", icon: <FaMoneyBillWave />, label: "Paid" }
        : { class: "badge-error", icon: <FaCreditCard />, label: "Unpaid" };

    return {
      order: badges[status] || {
        class: "badge-ghost",
        icon: null,
        label: status,
      },
      payment: paymentBadge,
    };
  };

  const STATUS_COLORS = {
    pending: "#FFBB28",
    shipped: "#0088FE",
    delivered: "#00C49F",
    cancelled: "#FF8042",
  };

  const PAYMENT_COLORS = {
    paid: "#00C49F",
    unpaid: "#FF8042",
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!dashboardData) {
    return (
      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Welcome, Librarian!</h2>
            <p>Start by adding your first book to see your dashboard.</p>
            <button className="btn btn-primary mt-4">
              Add Your First Book
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <title>Librarian Dashboard - BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          {/* Header with Time Range Selector */}
          <Heading
            title="Librarian Dashboard"
            subtitle="Track your books performance and manage orders efficiently."
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card bg-base-200 dark:bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body items-center p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`p-3 rounded-xl bg-${stat.color}/10 text-${stat.color}`}
                    >
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                  </div>
                  <h3 className="text-sm mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-xs">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {/* Status Distribution */}
            <div className="card h-fit  bg-base-200 dark:bg-base-100 shadow-lg lg:sticky lg:top-20">
              <div className="card-body">
                <h2 className="card-title justify-center mb-7">
                  Order Analytics
                </h2>

                <div className="grid grid-cols-2 gap-4 h-80">
                  {/* Order Status Pie Chart */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4 text-center">
                      Order Status
                    </h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={Object.entries(
                              dashboardData.statusDistribution
                            ).map(([name, value]) => ({
                              name:
                                name.charAt(0).toUpperCase() + name.slice(1),
                              value,
                              color: STATUS_COLORS[name] || "#8884d8",
                            }))}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {Object.entries(
                              dashboardData.statusDistribution
                            ).map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={STATUS_COLORS[entry[0]] || "#8884d8"}
                              />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [value, "Orders"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Payment Status Bar Chart */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4 text-center">
                      Payment Status
                    </h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={Object.entries(
                            dashboardData.paymentDistribution
                          ).map(([name, value]) => ({
                            name: name.charAt(0).toUpperCase() + name.slice(1),
                            value,
                            color: PAYMENT_COLORS[name],
                          }))}
                          layout="vertical"
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={false}
                          />
                          <XAxis
                            type="number"
                            stroke={theme === "light" ? "black" : "white"}
                          />
                          <YAxis
                            type="category"
                            dataKey="name"
                            width={60}
                            tick={{ fontSize: 12 }}
                            stroke={theme === "light" ? "black" : "white"}
                          />
                          <Tooltip formatter={(value) => [value, "Orders"]} />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {Object.entries(
                              dashboardData.paymentDistribution
                            ).map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={PAYMENT_COLORS[entry[0]] || "#8884d8"}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Books & Quick Stats */}
            <div className="space-y-6">
              {/* Top Selling Books */}
              <div className="card bg-base-200 dark:bg-base-100 shadow-lg">
                <div className="card-body p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <FaChartLine className="text-primary" />
                      Top Selling Books
                    </h2>
                    <div className="badge badge-primary">
                      Top {dashboardData.myTopBooks.length}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {dashboardData.myTopBooks.map((book, index) => (
                      <div
                        key={book.bookId}
                        className="flex items-center gap-3 p-3 bg-base-200 dark:bg-base-300 rounded-lg hover:shadow-sm transition-all"
                      >
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            index < 3
                              ? "bg-primary text-primary-content"
                              : "bg-base-100"
                          } font-bold text-sm`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1 truncate">
                            {book.title}
                          </h4>
                          <div className="flex items-center justify-between text-xs">
                            <span>{book.sales} sales</span>
                            <span className="font-bold text-primary">
                              {book.revenue}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="card bg-linear-to-br from-primary/10 to-secondary/10 shadow-lg">
                <div className="card-body p-6">
                  <h2 className="card-title mb-6">This Month's Performance</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/20 text-primary">
                          <FaBook />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Books Sold</p>
                          <p className="text-2xl font-bold">
                            {dashboardData.stats.totalOrders}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">Monthly</div>
                        <div className="text-success flex items-center gap-1">
                          <FaArrowUp />
                          {dashboardData.stats.orderTrend}%
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary/20 text-secondary">
                          <FaDollarSign />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Monthly Revenue</p>
                          <p className="text-2xl font-bold">
                            {formatCurrency(dashboardData.stats.monthlyRevenue)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">Growth</div>
                        <div className="text-success flex items-center gap-1">
                          <FaArrowUp />
                          {dashboardData.stats.revenueTrend}%
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/20 text-accent">
                          <FaStar />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Avg Order Value</p>
                          <p className="text-2xl font-bold">
                            {formatCurrency(
                              dashboardData.stats.averageOrderValue
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">Pending</div>
                        <div className="text-warning">
                          {dashboardData.stats.pendingOrders} orders
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-base-300">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Completion Rate</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-success">
                          {Math.round(
                            (dashboardData.stats.completedOrders /
                              dashboardData.stats.totalOrders) *
                              100
                          ) || 0}
                          %
                        </div>
                        <div className="text-xs">
                          {dashboardData.stats.completedOrders} of{" "}
                          {dashboardData.stats.totalOrders} orders
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
            <div className="card-body p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaShoppingCart className="text-primary" />
                  Recent Orders
                </h2>
                <Link
                  to="my-orders"
                  className="link link-primary link-hover font-semibold md:text-base"
                >
                  Manage Orders
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Book</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentOrders.map((order) => {
                      const badges = getStatusBadge(
                        order.status,
                        order.paymentStatus
                      );
                      return (
                        <tr key={order.id} className="hover">
                          <td>
                            <div>
                              <div className="font-medium">
                                {order.customerName}
                              </div>
                              <div className="text-xs truncate max-w-[150px]">
                                {order.customerEmail}
                              </div>
                            </div>
                          </td>
                          <td className="font-medium truncate max-w-[150px]">
                            {order.bookName}
                          </td>
                          <td className="text-sm">{order.date}</td>
                          <td className="font-bold text-primary">
                            {order.amount}
                          </td>
                          <td>
                            <span
                              className={`badge gap-1 ${badges.order.class}`}
                            >
                              {badges.order.icon}
                              {badges.order.label}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge gap-1 ${badges.payment.class}`}
                            >
                              {badges.payment.icon}
                              {badges.payment.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default LibrarianOverview;
