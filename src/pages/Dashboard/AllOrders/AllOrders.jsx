import useAuthStore from "@/stores/use-auth-store";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  FaCheckCircle,
  FaClipboardList,
  FaTimesCircle,
  FaTruck,
} from "react-icons/fa";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import Container from "../../../components/ui/container";
import Heading from "../../../components/ui/heading";
import Loading from "../../../components/ui/loading";
import TablePaginationComponent from "../../../components/ui/table-pagination";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { getAlert } from "../../../utils/get-alert";

const AllOrders = () => {
  const user = useAuthStore((s) => s.user);
  const secureAxios = useSecureAxios();
  const [searchParams] = useSearchParams();

  const sortOrder = searchParams.get("sortOrder") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const limit = searchParams.get("limit") || 10;
  const page = searchParams.get("page") || 1;

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-orders", "admin", user.email],
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

  const orders = data.data || [];
  const { totalDocs } = data.pagination || {};

  const handleStatusChange = async (orderId, status) => {
    try {
      const { data } = await secureAxios.put(`/orders/${orderId}`, { status });

      if (data.success) {
        refetch();

        getAlert({
          title: `Order ${status} successfully`,
        });
      } else {
        getAlert({
          title: data.message || "Status update failed! Please try again.",
          icon: "error",
        });
      }
    } catch {
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

                <TablePaginationComponent total={totalDocs} />
              </TableContainer>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default AllOrders;
