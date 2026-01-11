import {
  FaBook,
  FaUsers,
  FaShoppingCart,
  FaUserCheck,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaUserTie,
  FaBookReader,
  FaHeart,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaTimesCircle,
  FaMoneyBillWave,
  FaCreditCard,
  FaChartBar,
  FaFilter,
  FaTable,
  FaUserPlus,
  FaBookMedical,
} from "react-icons/fa";
import {
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
  Area,
  ComposedChart,
} from "recharts";
import Container from "../../shared/Container/Container";
import Heading from "../../../components/Heading/Heading";
import Loading from "../../../components/Loading/Loading";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { Link } from "react-router";
import useTheme from "../../../hooks/useTheme";

const AdminOverview = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const { theme } = useTheme();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: [user.email, "admin-overview"],
    queryFn: async () => {
      const { data } = await secureAxios.get(`/dashboard/admin/${user.email}`);

      return data?.data;
    },
  });

  const stats = dashboardData
    ? [
        {
          title: "Total Books",
          value: dashboardData.stats.totalBooks.toLocaleString(),
          icon: <FaBook />,
          color: "primary",
          description: "Across all librarians",
        },
        {
          title: "Total Users",
          value: dashboardData.stats.totalUsers.toLocaleString(),
          change: `+${Math.round(
            (dashboardData.stats.activeUsers / dashboardData.stats.totalUsers) *
              100
          )}% active`,
          icon: <FaUsers />,
          color: "secondary",
          description: `${dashboardData.stats.activeUsers} active users`,
        },
        {
          title: "Total Orders",
          value: dashboardData.stats.totalOrders.toLocaleString(),
          change: `${dashboardData.stats.successRate}% success rate`,
          icon: <FaShoppingCart />,
          color: "accent",
          description: `${dashboardData.stats.completedOrders} completed`,
        },
        {
          title: "Platform Health",
          value: `${dashboardData.stats.successRate}%`,
          change: `${dashboardData.stats.booksPerLibrarian} books/librarian`,
          icon: <FaChartLine />,
          color: "success",
          description: "Order success rate",
        },
      ]
    : [];

  const userStats = dashboardData
    ? [
        {
          title: "Total Readers",
          value: dashboardData.stats.totalReaders.toLocaleString(),
          icon: <FaBookReader />,
          color: "info",
        },
        {
          title: "Total Librarians",
          value: dashboardData.stats.totalLibrarians.toLocaleString(),
          icon: <FaUserTie />,
          color: "warning",
        },
        {
          title: "Active Users",
          value: dashboardData.stats.activeUsers.toLocaleString(),
          icon: <FaUserCheck />,
          color: "success",
        },
        {
          title: "Wishlist Items",
          value: dashboardData.stats.totalWishlistItems.toLocaleString(),
          icon: <FaHeart />,
          color: "error",
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

  const BOOK_STATUS_COLORS = {
    published: "#00C49F",
    unpublished: "#FF8042",
    draft: "#FFBB28",
  };

  const USER_ROLE_COLORS = {
    user: "#0088FE",
    librarian: "#FF8042",
    admin: "#8884d8",
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!dashboardData) {
    return (
      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <p>No data available. Please check your database connection.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <title>Admin Dashboard - BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          {/* Header*/}
          <Heading
            title="Admin Dashboard"
            subtitle="Monitor platform performance and manage all activities."
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card bg-base-200 dark:bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body items-center p-4 sm:p-6">
                  <div
                    className={`p-3 rounded-xl bg-${stat.color}/10 text-${stat.color}`}
                  >
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <h3 className="text-sm opacity-70 mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-xs opacity-70">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* User Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {userStats.map((stat, index) => (
              <div
                key={index}
                className="card bg-base-200 dark:bg-base-100 shadow-lg"
              >
                <div className="card-body items-center p-4">
                  <div
                    className={`p-2 rounded-lg bg-${stat.color}/10 text-${stat.color}`}
                  >
                    <span className="text-xl">{stat.icon}</span>
                  </div>
                  <h3 className="text-xs opacity-70 mb-1">{stat.title}</h3>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {/* User Growth Chart */}
            <div className="card bg-base-200 dark:bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title mb-6">User Growth & Distribution</h2>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={dashboardData.userGrowthChartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--bc)/0.2)"
                      />
                      <XAxis
                        dataKey="monthName"
                        stroke={theme === "light" ? "black" : "white"}
                      />
                      <YAxis stroke={theme === "light" ? "black" : "white"} />

                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="totalUsers"
                        name="Total Users"
                        stroke="#fcb700db"
                        fill="#fcb700ad"
                        fillOpacity={0.2}
                      />
                      <Bar
                        dataKey="readers"
                        name="Readers"
                        fill="#6aece1"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="librarians"
                        name="Librarians"
                        fill="#26ccc2"
                        radius={[4, 4, 0, 0]}
                      />
                      <Tooltip contentStyle={{
                        color: 'black'
                      }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Platform Health Charts */}
            <div className="card bg-base-200 dark:bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title mb-6">Platform Health Analytics</h2>

                <div className="grid grid-cols-2 gap-4 h-80">
                  {/* Order Status Distribution */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4 text-center">
                      Order Status
                    </h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={Object.entries(
                              dashboardData.orderStatusDistribution
                            ).map(([name, value]) => ({
                              name:
                                name.charAt(0).toUpperCase() + name.slice(1),
                              value,
                              color: STATUS_COLORS[name] || "#8884d8",
                            }))}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={40}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {Object.entries(
                              dashboardData.orderStatusDistribution
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

                  {/* Book Status Distribution */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4 text-center">
                      Book Status
                    </h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={Object.entries(
                              dashboardData.bookStatusDistribution
                            ).map(([name, value]) => ({
                              name:
                                name.charAt(0).toUpperCase() + name.slice(1),
                              value,
                              color: BOOK_STATUS_COLORS[name] || "#8884d8",
                            }))}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={40}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {Object.entries(
                              dashboardData.bookStatusDistribution
                            ).map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={BOOK_STATUS_COLORS[entry[0]] || "#8884d8"}
                              />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [value, "Books"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2 h-fit lg:sticky lg:top-20">
              <div className="card bg-base-200 dark:bg-base-100 shadow-lg">
                <div className="card-body p-4 sm:p-6">
                  <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <FaShoppingCart className="text-primary" />
                    Recent Platform Orders
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Book</th>
                          <th>Librarian</th>
                          <th>Status</th>
                          <th>Payment</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.recentOrders.map((order) => {
                          const badges = getStatusBadge(
                            order.status,
                            order.paymentStatus
                          );
                          return (
                            <tr key={order.id}>
                              <td>
                                <div className="max-w-[120px]">
                                  <div className="font-medium truncate">
                                    {order.customerName}
                                  </div>
                                  <div className="text-xs truncate">
                                    {order.customerEmail}
                                  </div>
                                </div>
                              </td>
                              <td className="max-w-[150px] truncate font-medium">
                                {order.bookName}
                              </td>
                              <td className="max-w-[120px] truncate text-sm">
                                {order.librarianEmail}
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
                              <td className="text-sm text-nowrap">
                                {order.date}
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

            {/* Top Selling Books */}
            <div className="card bg-base-200 dark:bg-base-100 shadow-lg h-fit lg:sticky lg:top-20">
              <div className="card-body p-4 sm:p-6">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <FaChartLine className="text-primary" />
                  Top Selling Books
                </h2>

                <div className="space-y-4">
                  {dashboardData.topBooks.map((book, index) => (
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
                        <p className="text-xs mb-2 truncate">
                          {book.author} • {book.category}
                        </p>
                        <span className="font-medium text-xs">
                          {book.sales} sales
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="mt-8 sm:mt-10">
            <div className="card bg-base-200 dark:bg-base-100 shadow-lg">
              <div className="card-body p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg sm:text-xl font-bold">
                    Platform Insights & Actions
                  </h2>
                  <div className="flex gap-2">
                    <span className="badge badge-primary">Live</span>
                    <span className="badge badge-success">Healthy</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Performance Metrics */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm mb-2">
                      Performance Metrics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Avg. Books per Librarian
                        </span>
                        <span className="font-bold">
                          {dashboardData.stats.booksPerLibrarian}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Avg. Wishlist per User</span>
                        <span className="font-bold">
                          {dashboardData.stats.avgWishlistPerUser}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active User Rate</span>
                        <span className="font-bold text-success">
                          {Math.round(
                            (dashboardData.stats.activeUsers /
                              dashboardData.stats.totalUsers) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* System Health */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm mb-2">
                      System Health
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="radial-progress text-success"
                            style={{
                              "--value": 95,
                              "--size": "1.5rem",
                              "--thickness": "3px",
                            }}
                          ></div>
                          <span className="text-xs">Healthy</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">API Response</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="radial-progress text-success"
                            style={{
                              "--value": 98,
                              "--size": "1.5rem",
                              "--thickness": "3px",
                            }}
                          ></div>
                          <span className="text-xs">Fast</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Uptime</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="radial-progress text-success"
                            style={{
                              "--value": 99.9,
                              "--size": "1.5rem",
                              "--thickness": "3px",
                            }}
                          ></div>
                          <span className="text-xs">99.9%</span>
                        </div>
                      </div>
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

export default AdminOverview;
