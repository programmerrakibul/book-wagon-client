import {
  FaBook,
  FaShoppingCart,
  FaDollarSign,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
} from "react-icons/fa";
import Container from "../../shared/Container/Container";
import Heading from "../../../components/Heading/Heading";

const LibrarianOverview = () => {
  const stats = [
    {
      title: "My Books",
      value: "156",
      change: "+5%",
      trend: "up",
      icon: <FaBook />,
      color: "primary",
    },
    {
      title: "Total Orders",
      value: "342",
      change: "+12%",
      trend: "up",
      icon: <FaShoppingCart />,
      color: "secondary",
    },
    {
      title: "Total Revenue",
      value: "৳ 28,450",
      change: "+8%",
      trend: "up",
      icon: <FaDollarSign />,
      color: "success",
    },
    {
      title: "Completed Orders",
      value: "298",
      change: "-2%",
      trend: "down",
      icon: <FaCheckCircle />,
      color: "accent",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-101",
      customer: "Alice Brown",
      book: "The Alchemist",
      amount: "৳ 520",
      status: "Pending",
      date: "Dec 10, 2025",
    },
    {
      id: "ORD-102",
      customer: "Bob Wilson",
      book: "Atomic Habits",
      amount: "৳ 480",
      status: "Shipped",
      date: "Dec 11, 2025",
    },
    {
      id: "ORD-103",
      customer: "Carol Davis",
      book: "Sapiens",
      amount: "৳ 650",
      status: "Completed",
      date: "Dec 11, 2025",
    },
    {
      id: "ORD-104",
      customer: "David Lee",
      book: "Educated",
      amount: "৳ 590",
      status: "Pending",
      date: "Dec 12, 2025",
    },
  ];

  const myTopBooks = [
    { title: "The Alchemist", sales: 45, revenue: "৳ 23,400" },
    { title: "Atomic Habits", sales: 38, revenue: "৳ 18,240" },
    { title: "Sapiens", sales: 35, revenue: "৳ 22,750" },
    { title: "Educated", sales: 32, revenue: "৳ 18,880" },
    { title: "Thinking, Fast and Slow", sales: 28, revenue: "৳ 16,800" },
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
            title="Librarian Dashboard"
            subtitle="Track your books performance and manage orders efficiently."
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
            {/* Recent Orders for My Books */}
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

            {/* My Top Selling Books */}
            <div>
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold  mb-4 sm:mb-6 flex items-center gap-2">
                    <FaChartLine className="text-primary" />
                    My Top Books
                  </h2>

                  <div className="space-y-4">
                    {myTopBooks.map((book, index) => (
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

          {/* Performance Summary */}
          <div className="mt-8 sm:mt-10">
            <div className="card bg-linear-to-br from-primary/10 to-secondary/10 shadow-lg">
              <div className="card-body p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold  mb-4">
                  This Month's Performance
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <p className="text-xs sm:text-sm  mb-2">Books Sold</p>
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                      178
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm  mb-2">
                      Average Order Value
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-secondary">
                      ৳ 485
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm  mb-2">
                      Customer Satisfaction
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-success">
                      4.8/5
                    </p>
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

export default LibrarianOverview;
