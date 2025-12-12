import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router";
import { format } from "date-fns";
import {
  FaShoppingBag,
  FaTimes,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
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
import Button from "../../../components/Button/Button";
import Heading from "../../../components/Heading/Heading";
import Container from "../../shared/Container/Container";
import { toast } from "sonner";
import { useEffect } from "react";
import { getAlert } from "../../../utilities/getAlert";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const MyOrders = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

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

  useEffect(() => {
    let mount = true;

    if (session_id && mount) {
      refetch();

      secureAxios
        .get(`/checkout-session/retrieve/${session_id}`)
        .then(({ data }) => {
          MySwal.fire({
            icon: "success",
            title: "Payment Successful!",
            allowOutsideClick: false,
            html: (
              <div className="space-y-3">
                <p className="space-x-1.5">
                  <strong>Transaction ID:</strong>
                  <span>{data.transactionId}</span>
                </p>
                <p className="space-x-1.5">
                  <strong>Order ID:</strong>
                  <span>{data.orderID}</span>
                </p>
              </div>
            ),
          }).then((result) => {
            if (result.isConfirmed) {
              refetch();

              setSearchParams("");
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    mount = false;
  }, [session_id, secureAxios, setSearchParams, refetch]);

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

  const handlePayment = async (order) => {
    const paymentInfo = {
      customerEmail: order.customerEmail,
      price: order.orderedBook.price,
      bookId: order.bookId,
      description: order.orderedBook.description,
      bookName: order.orderedBook.bookName,
      orderID: order.orderID,
    };

    try {
      const { data } = await secureAxios.post(
        "/checkout-session/create",
        paymentInfo
      );

      console.log(data);
      window.location.assign(data.url);
    } catch (err) {
      console.log(err);

      toast.error("Payment failed! Please try again.");
    }
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
                <FaShoppingBag className="text-6xl sm:text-7xl  mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold  mb-2">
                  No Orders Yet
                </h3>
                <p className="text-sm sm:text-base  mb-4">
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
              <div className="hidden sm:block">
                <TableContainer component={Paper} className="shadow-lg">
                  <Table>
                    <TableHead>
                      <TableRow className="bg-primary/10">
                        <TableCell className="font-bold! text-base!">
                          Book Title
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Order Date
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Price
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Status
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Payment
                        </TableCell>
                        <TableCell
                          align="center"
                          className="font-bold! text-base!"
                        >
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
                          <TableCell className="min-w-40">
                            <span className="font-semibold  text-sm lg:text-base">
                              {order.orderedBook.bookName}
                            </span>
                          </TableCell>
                          <TableCell className=" text-sm lg:text-base text-nowrap">
                            {format(new Date(order.createdAt), "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell className="font-bold text-primary text-nowrap text-sm lg:text-base">
                            ৳ {order.orderedBook.price}
                          </TableCell>
                          <TableCell>
                            {order.status === "pending" && (
                              <span className="badge badge-warning gap-1 badge-sm">
                                <FaTimesCircle className="text-xs" />
                                Pending
                              </span>
                            )}
                            {order.status === "cancelled" && (
                              <span className="badge badge-error gap-1 badge-sm">
                                <FaTimesCircle className="text-xs" />
                                Cancelled
                              </span>
                            )}
                            {order.status === "completed" && (
                              <span className="badge badge-success gap-1 badge-sm">
                                <FaCheckCircle className="text-xs" />
                                Completed
                              </span>
                            )}
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
                          <TableCell align="center">
                            <div className="flex gap-2 justify-center">
                              {order.status === "pending" &&
                              order.paymentStatus !== "paid" ? (
                                <>
                                  <Button
                                    handleClick={() => handlePayment(order)}
                                    className="btn-sm!"
                                  >
                                    <FaCreditCard />
                                    Pay Now
                                  </Button>

                                  <button
                                    onClick={() =>
                                      handleOrderStatus(order._id, "cancelled")
                                    }
                                    className="btn btn-sm! btn-error text-xs"
                                  >
                                    <FaTimes />
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <span>No Action</span>
                              )}
                            </div>
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
                      <h3 className="font-bold text-base sm:text-lg  mb-2">
                        {order.orderedBook.bookName}
                      </h3>

                      <div className="space-y-2 text-sm sm:text-base">
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
                          <span className="">Status:</span>
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
                      </div>

                      {order.status === "pending" &&
                        order.paymentStatus !== "paid" && (
                          <div className="flex gap-2 mt-4">
                            <Button
                              handleClick={() => handlePayment(order)}
                              className="btn-sm! btn-block flex-1"
                            >
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
