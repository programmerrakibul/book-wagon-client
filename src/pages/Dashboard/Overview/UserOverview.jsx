import {
  FaShoppingCart,
  FaHeart,
  FaBook,
  FaCheckCircle,
  FaClock,
  FaTruck,
} from "react-icons/fa";
import Container from "../../shared/Container/Container";
import Heading from "../../../components/Heading/Heading";

const UserOverview = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "12",
      icon: <FaShoppingCart />,
      color: "primary",
    },
    {
      title: "Wishlist Items",
      value: "8",
      icon: <FaHeart />,
      color: "error",
    },
    {
      title: "Books Purchased",
      value: "15",
      icon: <FaBook />,
      color: "secondary",
    },
    {
      title: "Completed Orders",
      value: "9",
      icon: <FaCheckCircle />,
      color: "success",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-501",
      book: "The Great Gatsby",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100",
      amount: "৳ 450",
      status: "Delivered",
      date: "Dec 8, 2025",
    },
    {
      id: "ORD-502",
      book: "To Kill a Mockingbird",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100",
      amount: "৳ 380",
      status: "Shipped",
      date: "Dec 10, 2025",
    },
    {
      id: "ORD-503",
      book: "1984",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=100",
      amount: "৳ 420",
      status: "Processing",
      date: "Dec 12, 2025",
    },
  ];

  const wishlistBooks = [
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: "৳ 390",
      image:
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=100",
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: "৳ 420",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100",
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      price: "৳ 460",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100",
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      Delivered: { class: "badge-success", icon: <FaCheckCircle /> },
      Shipped: { class: "badge-info", icon: <FaTruck /> },
      Processing: { class: "badge-warning", icon: <FaClock /> },
    };
    return badges[status] || { class: "badge-ghost", icon: null };
  };

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
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body p-4 sm:p-6 text-center">
                  <div
                    className={`mx-auto p-3 sm:p-4 rounded-full bg-${stat.color}/10 text-${stat.color} w-fit mb-3`}
                  >
                    <span className="text-2xl sm:text-3xl">{stat.icon}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm text-gray-600 mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800">
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
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FaShoppingCart className="text-primary" />
                      Recent Orders
                    </h2>
                    <button className="btn btn-sm btn-ghost text-primary">
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {recentOrders.map((order) => {
                      const statusBadge = getStatusBadge(order.status);
                      return (
                        <div
                          key={order.id}
                          className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-base-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <img
                            src={order.image}
                            alt={order.book}
                            className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded shadow"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-sm sm:text-base text-gray-800 truncate">
                                  {order.book}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {order.id}
                                </p>
                              </div>
                              <span
                                className={`badge badge-sm ${statusBadge.class} gap-1 ml-2`}
                              >
                                {statusBadge.icon}
                                {order.status}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm text-gray-600">
                                {order.date}
                              </span>
                              <span className="font-bold text-primary text-sm sm:text-base">
                                {order.amount}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Wishlist */}
            <div>
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FaHeart className="text-error" />
                      My Wishlist
                    </h2>
                    <button className="btn btn-sm btn-ghost text-error">
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {wishlistBooks.map((book, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-3 bg-base-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded shadow"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-800 truncate mb-1">
                            {book.title}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {book.author}
                          </p>
                          <p className="font-bold text-primary text-sm">
                            {book.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reading Stats */}
          <div className="mt-8 sm:mt-10">
            <div className="card bg-linear-to-br from-primary/10 to-secondary/10 shadow-lg">
              <div className="card-body p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Your Reading Journey
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center p-4 bg-base-100 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      Total Spent
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                      ৳ 6,840
                    </p>
                  </div>
                  <div className="text-center p-4 bg-base-100 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      Books This Month
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-secondary">
                      3
                    </p>
                  </div>
                  <div className="text-center p-4 bg-base-100 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      Member Since
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-accent">
                      2024
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

export default UserOverview;
