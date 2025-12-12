import {
  FaBook,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
} from "react-icons/fa";
import Container from "../../shared/Container/Container";
import Heading from "../../../components/Heading/Heading";

const AdminOverview = () => {
  const stats = [
    {
      title: "Total Books",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: <FaBook />,
      color: "primary",
    },
    {
      title: "Total Users",
      value: "5,678",
      change: "+8%",
      trend: "up",
      icon: <FaUsers />,
      color: "secondary",
    },
    {
      title: "Total Orders",
      value: "892",
      change: "+15%",
      trend: "up",
      icon: <FaShoppingCart />,
      color: "accent",
    },
    {
      title: "Total Revenue",
      value: "৳ 45,890",
      change: "-3%",
      trend: "down",
      icon: <FaDollarSign />,
      color: "success",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      book: "The Great Gatsby",
      amount: "৳ 450",
      status: "Completed",
      date: "Dec 10, 2025",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      book: "To Kill a Mockingbird",
      amount: "৳ 380",
      status: "Pending",
      date: "Dec 11, 2025",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      book: "1984",
      amount: "৳ 420",
      status: "Shipped",
      date: "Dec 11, 2025",
    },
    {
      id: "ORD-004",
      customer: "Sarah Williams",
      book: "Pride and Prejudice",
      amount: "৳ 390",
      status: "Completed",
      date: "Dec 12, 2025",
    },
  ];

  const topBooks = [
    { title: "The Great Gatsby", sales: 145, revenue: "৳ 65,250" },
    { title: "To Kill a Mockingbird", sales: 132, revenue: "৳ 50,160" },
    { title: "1984", sales: 128, revenue: "৳ 53,760" },
    { title: "Pride and Prejudice", sales: 115, revenue: "৳ 44,850" },
    { title: "The Catcher in the Rye", sales: 98, revenue: "৳ 41,160" },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      Completed: "badge-success",
      Pending: "badge-warning",
      Shipped: "badge-info",
      Cancelled: "badge-error",
    };
    return badges[status] || "badge-ghost";
  };

  return (
    <>
      <title>Dashboard Overview - BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          {/* Header */}
          <Heading
            title="Dashboard Overview"
            subtitle="Welcome back! Here's what's happening with your store today."
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`p-3 rounded-lg bg-${stat.color}/10 text-${stat.color}`}
                    >
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs sm:text-sm font-semibold ${
                        stat.trend === "up" ? "text-success" : "text-error"
                      }`}
                    >
                      {stat.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                      {stat.change}
                    </div>
                  </div>
                  <h3 className="text-xs sm:text-sm  mb-1">{stat.title}</h3>
                  <p className="text-2xl sm:text-3xl font-bold ">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-bold  flex items-center gap-2">
                      <FaShoppingCart className="text-primary" />
                      Recent Orders
                    </h2>
                    <button className="btn btn-sm btn-ghost text-primary">
                      View All
                    </button>
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="table table-zebra">
                      <thead>
                        <tr className="text-xs lg:text-sm">
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Book</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="text-xs lg:text-sm">
                            <td className="font-mono font-semibold">
                              {order.id}
                            </td>
                            <td>{order.customer}</td>
                            <td className="font-medium">{order.book}</td>
                            <td className="font-bold text-primary">
                              {order.amount}
                            </td>
                            <td>
                              <span
                                className={`badge badge-sm ${getStatusBadge(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="sm:hidden space-y-3">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-3 bg-base-200 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono text-xs font-semibold">
                            {order.id}
                          </span>
                          <span
                            className={`badge badge-sm ${getStatusBadge(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm font-medium mb-1">
                          {order.customer}
                        </p>
                        <p className="text-xs  mb-2">{order.book}</p>
                        <p className="text-sm font-bold text-primary">
                          {order.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Selling Books */}
            <div>
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold  mb-4 sm:mb-6 flex items-center gap-2">
                    <FaChartLine className="text-primary" />
                    Top Selling Books
                  </h2>

                  <div className="space-y-4">
                    {topBooks.map((book, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm  mb-1 truncate">
                            {book.title}
                          </h4>
                          <div className="flex items-center justify-between text-xs ">
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
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AdminOverview;
