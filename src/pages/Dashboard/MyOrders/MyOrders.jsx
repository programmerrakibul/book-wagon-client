import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { format } from "date-fns";
import {
  FaShoppingBag,
  FaTimes,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Loading from "../../../components/Loading/Loading";
import Button from "../../../components/Button/Button";
import Heading from "../../../components/Heading/Heading";
import Container from "../../shared/Container/Container";
import { toast } from "sonner";
import { getAlert } from "../../../utilities/getAlert";

const MyOrders = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders", "customer", user.email],
    queryFn: async () => {
      const { data } = await secureAxios.get(`/orders/customer/${user.email}`);
      return data?.orders;
    },
  });

  if (isLoading) {
    return <Loading message="Loading your orders..." />;
  }

  const handleOrderStatus = async (id, status) => {
    try {
      const { data } = await secureAxios.put(`/orders/${id}`, { status });

      if (data.modifiedCount) {
        refetch();

        getAlert({
          title: "Order cancelled successfully",
        });
      }
    } catch {
      toast.error("Order status update failed! Please try again.");
    }
    console.log({ id, status });
  };

  return (
    <>
      <title>My Orders - BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          <Heading
            title="My Orders"
            subtitle="View and manage all your book orders"
            size="large"
          />

          {orders.length === 0 ? (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center py-12 sm:py-16">
                <FaShoppingBag className="text-6xl sm:text-7xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
                  No Orders Yet
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4">
                  You haven't placed any orders yet.
                </p>
                <Link to="/books" className="btn btn-primary btn-sm sm:btn-md">
                  Browse Books
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr className="text-sm lg:text-base">
                      <th>Book Title</th>
                      <th>Order Date</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="text-sm lg:text-base">
                        <td className="font-semibold min-w-[185px]">
                          {order.orderedBook.bookName}
                        </td>
                        <td>
                          {format(new Date(order.createdAt), "MMM dd, yyyy")}
                        </td>
                        <td className="font-bold text-primary">
                          ৳ {order.orderedBook.price}
                        </td>
                        <td>
                          {order.status === "pending" && (
                            <span className="badge badge-warning gap-1">
                              <FaTimesCircle className="text-xs" />
                              Pending
                            </span>
                          )}
                          {order.status === "cancelled" && (
                            <span className="badge badge-error gap-1">
                              <FaTimesCircle className="text-xs" />
                              Cancelled
                            </span>
                          )}
                          {order.status === "completed" && (
                            <span className="badge badge-success gap-1">
                              <FaCheckCircle className="text-xs" />
                              Completed
                            </span>
                          )}
                        </td>
                        <td>
                          {order.paymentStatus === "paid" ? (
                            <span className="badge badge-success gap-1">
                              <FaCheckCircle className="text-xs" />
                              Paid
                            </span>
                          ) : (
                            <span className="badge badge-warning gap-1">
                              <FaTimesCircle className="text-xs" />
                              Unpaid
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="flex gap-2">
                            {order.status === "pending" &&
                              order.paymentStatus !== "paid" && (
                                <>
                                  <Button className="btn-sm! text-nowrap">
                                    <FaCreditCard />
                                    Pay Now
                                  </Button>

                                  <button
                                    onClick={() =>
                                      handleOrderStatus(order._id, "cancelled")
                                    }
                                    className="btn btn-sm! btn-error"
                                  >
                                    <FaTimes />
                                    Cancel
                                  </button>
                                </>
                              )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="card bg-base-100 shadow-lg">
                    <div className="card-body p-4 sm:p-5">
                      <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2">
                        {order.orderedBook.bookName}
                      </h3>

                      <div className="space-y-2 text-sm sm:text-base">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Order Date:</span>
                          <span className="font-semibold">
                            {format(new Date(order.createdAt), "MMM dd, yyyy")}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-bold text-primary">
                            ৳ {order.orderedBook.price}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Status:</span>
                          {order.status === "pending" && (
                            <span className="badge badge-warning gap-1 text-xs sm:text-sm">
                              <FaTimesCircle className="text-xs" />
                              Pending
                            </span>
                          )}
                          {order.status === "cancelled" && (
                            <span className="badge badge-error gap-1 text-xs sm:text-sm">
                              <FaTimesCircle className="text-xs" />
                              Cancelled
                            </span>
                          )}
                          {order.status === "completed" && (
                            <span className="badge badge-success gap-1 text-xs sm:text-sm">
                              <FaCheckCircle className="text-xs" />
                              Completed
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Payment:</span>
                          {order.paymentStatus === "paid" ? (
                            <span className="badge badge-success gap-1 text-xs sm:text-sm">
                              <FaCheckCircle className="text-xs" />
                              Paid
                            </span>
                          ) : (
                            <span className="badge badge-warning gap-1 text-xs sm:text-sm">
                              <FaTimesCircle className="text-xs" />
                              Unpaid
                            </span>
                          )}
                        </div>
                      </div>

                      {order.status === "pending" &&
                        order.paymentStatus !== "paid" && (
                          <div className="flex gap-2 mt-4">
                            <Button className="btn-sm! btn-block flex-1">
                              <FaCreditCard />
                              Pay Now
                            </Button>

                            <button
                              onClick={() =>
                                handleOrderStatus(order._id, "cancelled")
                              }
                              className="btn btn-sm! btn-error flex-1"
                            >
                              <FaTimes />
                              Cancel
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default MyOrders;
