import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Loading from "../../../components/Loading/Loading";
import Heading from "../../../components/Heading/Heading";
import Container from "../../shared/Container/Container";
import { toast } from "sonner";
import { getAlert } from "../../../utilities/getAlert";

const AllOrders = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-orders", "librarian", user.email],
    queryFn: async () => {
      const { data } = await secureAxios.get(`/orders/librarian/${user.email}`);
      return data?.orders || [];
    },
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: (
        <span className="badge badge-warning gap-1">
          <FaTimesCircle className="text-xs" />
          Pending
        </span>
      ),
      shipped: (
        <span className="badge badge-info gap-1">
          <FaTruck className="text-xs" />
          Shipped
        </span>
      ),
      delivered: (
        <span className="badge badge-success gap-1">
          <FaCheckCircle className="text-xs" />
          Delivered
        </span>
      ),
      cancelled: (
        <span className="badge badge-error gap-1">
          <FaTimesCircle className="text-xs" />
          Cancelled
        </span>
      ),
    };
    return badges[status] || badges.pending;
  };

  if (isLoading) {
    return <Loading message="Loading orders..." />;
  }

  const handleStatusChange = async (orderId, status) => {
    try {
      const { data } = await secureAxios.put(`/orders/${orderId}`, { status });

      if (data.modifiedCount) {
        refetch();

        getAlert({
          title: `Order ${status} successfully`,
        });
      }
    } catch (err) {
      console.log(err);

      toast.error("Status update failed! Please try again.");
    }
  };

  return (
    <>
      <title>All Orders - BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          <Heading
            icon={<FaClipboardList />}
            title="All Orders"
            subtitle="Manage orders for your books"
            size="large"
          />

          {orders.length === 0 ? (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center py-12 sm:py-16">
                <FaClipboardList className="text-6xl sm:text-7xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
                  No Orders Yet
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  No orders have been placed for your books yet.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr className="text-sm lg:text-base">
                      <th>Book Name</th>
                      <th>Customer</th>
                      <th>Order Date</th>
                      <th>Price</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="text-sm lg:text-base">
                        <td className="font-semibold min-w-[180px] w-full">
                          {order.orderedBook.bookName}
                        </td>
                        <td>
                          <div>
                            <div className="font-medium">
                              {order.customerName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.customerEmail}
                            </div>
                          </div>
                        </td>
                        <td>
                          {format(new Date(order.createdAt), "MMM dd, yyyy")}
                        </td>
                        <td className="font-bold text-primary text-nowrap">
                          ৳ {order.orderedBook.price}
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
                        <td>{getStatusBadge(order.status)}</td>
                        <td>
                          {order.status !== "cancelled" &&
                          order.status !== "delivered" ? (
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(order._id, e.target.value)
                              }
                              className="select select-bordered select-sm min-w-24 text-xs sm:text-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span className="text-xs sm:text-sm text-gray-500 text-nowrap">
                              No actions
                            </span>
                          )}
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
                      <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-3">
                        {order.orderedBook.bookName}
                      </h3>

                      <div className="space-y-2 text-sm sm:text-base">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Customer:</span>
                          <div className="text-right">
                            <div className="font-medium">
                              {order.customerName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.customerEmail}
                            </div>
                          </div>
                        </div>

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

                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Status:</span>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>

                      {order.status !== "cancelled" &&
                        order.status !== "delivered" && (
                          <div className="mt-4">
                            <label className="text-xs text-gray-600 mb-1 block">
                              Update Status:
                            </label>
                            <select
                              className="select select-bordered select-sm w-full text-sm"
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(order._id, e.target.value)
                              }
                            >
                              <option value="pending">Pending</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
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

export default AllOrders;
