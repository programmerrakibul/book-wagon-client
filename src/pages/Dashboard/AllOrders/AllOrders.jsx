import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
} from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
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
                <FaClipboardList className="text-6xl sm:text-7xl  mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold  mb-2">
                  No Orders Yet
                </h3>
                <p className="text-sm sm:text-base ">
                  No orders have been placed for your books yet.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block">
                <TableContainer component={Paper} className="shadow-lg!">
                  <Table>
                    <TableHead>
                      <TableRow className="bg-primary/10">
                        <TableCell className="font-bold! text-base!">
                          Book Name
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Customer
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Order Date
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Price
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Payment
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Status
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow
                          key={order._id}
                          className="hover:bg-base-200 transition-colors"
                        >
                          <TableCell>
                            <span className="font-semibold  text-sm lg:text-base">
                              {order.orderedBook.bookName}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium  text-sm">
                                {order.customerName}
                              </div>
                              <div className="text-xs ">
                                {order.customerEmail}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className=" text-sm lg:text-base text-nowrap">
                            {format(new Date(order.createdAt), "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell className="font-bold text-primary text-sm lg:text-base whitespace-nowrap">
                            ৳ {order.orderedBook.price}
                          </TableCell>
                          <TableCell>
                            {order.paymentStatus === "paid" ? (
                              <span className="badge badge-success gap-1 badge-sm">
                                <FaCheckCircle className="text-xs" />
                                Paid
                              </span>
                            ) : (
                              <span className="badge badge-warning gap-1 badge-sm">
                                <FaTimesCircle className="text-xs" />
                                Unpaid
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            {order.status !== "cancelled" &&
                            order.status !== "delivered" ? (
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  handleStatusChange(order._id, e.target.value)
                                }
                                className="select select-bordered select-sm text-xs"
                              >
                                <option value="pending">Pending</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span className="text-xs  whitespace-nowrap">
                                No actions
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="card bg-base-100 shadow-lg">
                    <div className="card-body p-4 sm:p-5">
                      <h3 className="font-bold text-base sm:text-lg  mb-3">
                        {order.orderedBook.bookName}
                      </h3>

                      <div className="space-y-2 text-sm sm:text-base">
                        <div className="flex justify-between">
                          <span className="">Customer:</span>
                          <div className="text-right">
                            <div className="font-medium">
                              {order.customerName}
                            </div>
                            <div className="text-xs ">
                              {order.customerEmail}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <span className="">Order Date:</span>
                          <span className="font-semibold">
                            {format(new Date(order.createdAt), "MMM dd, yyyy")}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="">Price:</span>
                          <span className="font-bold text-primary">
                            ৳ {order.orderedBook.price}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="">Payment:</span>
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
                          <span className="">Status:</span>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>

                      {order.status !== "cancelled" &&
                        order.status !== "delivered" && (
                          <div className="mt-4">
                            <label className="text-xs  mb-1 block">
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
