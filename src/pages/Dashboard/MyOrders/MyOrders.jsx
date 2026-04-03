import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router";
import { format } from "date-fns";
import {
  FaShoppingBag,
  FaTimes,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaBook,
  FaShippingFast,
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
import TablePaginationComponent from "../../../components/TablePaginationComponent/TablePaginationComponent";

const MySwal = withReactContent(Swal);

const MyOrders = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  const sortOrder = searchParams.get("sortOrder") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const limit = searchParams.get("limit") || 10;
  const page = searchParams.get("page") || 1;

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders", user.email],
    queryFn: async () => {
      const { data } = await secureAxios.get("/orders", {
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
        },
      });
      return data || {};
    },
  });

  useEffect(() => {
    let mount = true;

    if (session_id && mount) {
      refetch();

      secureAxios
        .get(`/checkout/retrieve/${session_id}`)
        .then(({ data }) => {
          refetch();

          if (data.success) {
            MySwal.fire({
              icon: "success",
              title: "Payment Successful!",
              allowOutsideClick: false,
              html: (
                <div className="space-y-3">
                  <p className="space-x-1.5">
                    <strong>Transaction ID:</strong>
                    <span>{data.data.transactionId}</span>
                  </p>
                  <p className="space-x-1.5">
                    <strong>Order ID:</strong>
                    <span>{data.data.orderID}</span>
                  </p>
                </div>
              ),
            }).then((result) => {
              if (result.isConfirmed) {
                setSearchParams("");
              }
            });
          } else {
            getAlert({
              title: data.message || "Payment failed! Please try again.",
              icon: "error",
            });
          }
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

  const orders = data.data || [];
  const { totalDocs } = data.pagination || {};

  const handleOrderStatus = async (id, status) => {
    try {
      const { data } = await secureAxios.put(`/orders/${id}`, { status });

      if (data.success) {
        refetch();

        getAlert({
          title: "Order cancelled successfully!",
        });
      } else {
        getAlert({
          title: data.message || "Order cancellation failed! Please try again.",
          icon: "error",
        });
      }
    } catch {
      toast.error("Order status update failed! Please try again.");
    }
  };

  const handlePayment = async (order) => {
    try {
      const { data } = await secureAxios.post(`/checkout/${order.orderID}`);

      if (data.success) {
        window.location.assign(data.data);
      } else {
        getAlert({
          title: data.message || "Payment failed! Please try again.",
          icon: "error",
        });
      }
    } catch {
      toast.error("Payment failed! Please try again.");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        label: "Pending",
        icon: <FaTimesCircle className="text-xs" />,
        className: "badge-warning",
      },
      cancelled: {
        label: "Cancelled",
        icon: <FaTimesCircle className="text-xs" />,
        className: "badge-error",
      },
      delivered: {
        label: "Completed",
        icon: <FaCheckCircle className="text-xs" />,
        className: "badge-success",
      },
      shipped: {
        label: "Shipped",
        icon: <FaShippingFast className="text-xs" />,
        className: "badge-info",
      },
    };

    const badgeConfig = statusConfig[status] || "";

    return (
      <span className={`badge ${badgeConfig.className} gap-1 badge-sm`}>
        {badgeConfig.icon}
        {badgeConfig.label}
      </span>
    );
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
                <Link to="/books">
                  <Button>
                    <FaBook />
                    Browse Books
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
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
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
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
                                  className="btn-sm! text-xs!"
                                >
                                  <FaCreditCard />
                                  Pay Now
                                </Button>

                                <button
                                  onClick={() =>
                                    handleOrderStatus(order._id, "cancelled")
                                  }
                                  className="btn btn-sm! btn-error text-xs!"
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

                <TablePaginationComponent total={totalDocs} />
              </TableContainer>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default MyOrders;
