import {
  FaShoppingCart,
  FaHeart,
  FaBook,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaTimesCircle,
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
  Legend,
  Line,
} from "recharts";
import Container from "../../shared/Container/Container";
import Heading from "../../../components/Heading/Heading";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import useTheme from "../../../hooks/useTheme";
import { Link } from "react-router";
import Loading from "../../../components/Loading/Loading";

const UserOverview = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const { theme } = useTheme();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: [user.email, "user-dashboard-overview"],
    queryFn: async () => {
      const { data } = await secureAxios.get(`/dashboard/user/${user.email}`);

      return data?.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const stats = dashboardData
    ? [
        {
          title: "Total Orders",
          value: dashboardData?.stats?.totalOrders?.toString(),
          icon: <FaShoppingCart />,
          color: "primary",
        },
        {
          title: "Wishlist Items",
          value: dashboardData?.stats?.wishlistItems?.toString(),
          icon: <FaHeart />,
          color: "error",
        },
        {
          title: "Books Purchased",
          value: dashboardData?.stats?.booksPurchased?.toString(),
          icon: <FaBook />,
          color: "secondary",
        },
        {
          title: "Completed Orders",
          value: dashboardData?.stats?.completedOrders?.toString(),
          icon: <FaCheckCircle />,
          color: "success",
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
        label: "Processing",
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
  const STATUS_COLORS = {
    pending: "#FFBB28",
    shipped: "#0088FE",
    delivered: "#00C49F",
    cancelled: "#FF8042",
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!dashboardData) {
    return (
      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">No data available</h2>
            <p>Start your reading journey by making your first purchase!</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <title>Dashboard Overview - BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          {/* Header */}
          <Heading
            title="My Dashboard"
            subtitle="Welcome back! Here's an overview of your reading journey."
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card bg-base-100 dark:bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body items-center p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-3 rounded-xl bg-${stat.color}/10 text-${stat.color}`}
                    >
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                  </div>
                  <h3 className="text-sm mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {/* Orders Trend Chart */}
            <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title mb-6">Monthly Orders & Spending</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardData?.chartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        // stroke="hsl(var(--bc)/0.2)"
                      />
                      <XAxis
                        dataKey="month"
                        tickFormatter={(month) => `Month ${month}`}
                        stroke={theme === "light" ? "black" : "white"}
                      />
                      <YAxis
                        yAxisId="left"
                        stroke={theme === "light" ? "black" : "white"}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke={theme === "light" ? "black" : "white"}
                      />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === "amount")
                            return [formatCurrency(value), "Amount"];
                          return [value, "Orders"];
                        }}
                        contentStyle={{
                          backgroundColor: "hsl(var(--b1))",
                          borderColor: "hsl(var(--bc)/0.2)",
                          color: theme === "light" ? "black" : "white",
                        }}
                      />
                      <Legend />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="amount"
                        name="Amount"
                        stroke="hsl(var(--s))"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="orders"
                        name="Orders"
                        fill="#6aece1"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Order Status Distribution */}
            <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title mb-6">Order Status Distribution</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.entries(
                          dashboardData.statusDistribution
                        ).map(([name, value]) => ({
                          name: name.charAt(0).toUpperCase() + name.slice(1),
                          value,
                          color: STATUS_COLORS[name] || "#8884d8",
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {Object.entries(dashboardData.statusDistribution).map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                STATUS_COLORS[entry[0]] ||
                                COLORS[index % COLORS.length]
                              }
                            />
                          )
                        )}
                      </Pie>
                      <Tooltip formatter={(value) => [value, "Orders"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <div className="card bg-base-100 dark:bg-base-200 shadow-lg lg:sticky lg:top-20">
                <div className="card-body p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <FaShoppingCart className="text-primary" />
                      Recent Orders
                    </h2>
                    <Link
                      to={"my-orders"}
                      className="link link-primary link-hover md:text-base font-semibold"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Book</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Status</th>
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
                                <div className="flex items-center gap-3 min-w-[200px]">
                                  <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                      <img
                                        src={order.bookImage}
                                        alt={order.bookName}
                                        className="object-cover"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-bold line-clamp-1">
                                      {order.bookName}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-nowrap">{order.date}</td>
                              <td className="font-bold">{order.amount}</td>
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
            </div>

            {/* Wishlist & Quick Stats */}
            <div className="space-y-6 sm:gap-8">
              {/* Wishlist */}
              <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
                <div className="card-body p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <FaHeart className="text-error" />
                      My Wishlist
                    </h2>
                    <Link
                      to={"my-wishlist"}
                      className="link link-primary link-hover font-semibold md:text-base"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {dashboardData.wishlist.slice(0, 3).map((book, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-3 bg-base-200 dark:bg-base-300 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded shadow"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate mb-1">
                            {book.title}
                          </h4>
                          <p className="text-xs mb-2">{book.author}</p>
                          <div className="flex justify-between items-center">
                            <p className="font-bold text-primary text-sm">
                              {book.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card bg-linear-to-br from-primary/10 to-secondary/10 shadow-lg">
                <div className="card-body p-6">
                  <h2 className="card-title mb-6">Reading Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-base-300">
                      <span>Total Spent</span>
                      <span className="text-xl font-bold text-primary">
                        {formatCurrency(dashboardData.stats.totalSpent)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-base-300">
                      <span>Books This Month</span>
                      <span className="text-xl font-bold text-primary">
                        {dashboardData.stats.booksThisMonth}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Member Since</span>
                      <span className="text-xl font-bold text-primary">
                        {dashboardData.stats.memberSince}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default UserOverview;
