import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FaFileInvoice, FaCheckCircle, FaBook } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Loading from "../../../components/Loading/Loading";
import Heading from "../../../components/Heading/Heading";
import Container from "../../shared/Container/Container";

const Invoices = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["invoices", "paid", user.email],
    queryFn: async () => {
      const { data } = await secureAxios.get(`/payments/${user.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading message="Loading your invoices..." />;
  }

  return (
    <>
      <title>Invoices - BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          <Heading
            title="Payment Invoices"
            subtitle="View all your payment history and invoices"
            size="large"
          />

          {invoices.length === 0 ? (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center py-12 sm:py-16">
                <FaFileInvoice className="text-6xl sm:text-7xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
                  No Invoices Yet
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  You haven't made any payments yet.
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
                      <th>Payment ID</th>
                      <th>Payment Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice._id} className="text-sm lg:text-base">
                        <td className="font-semibold min-w-[170px] w-full">
                          {invoice.bookName}
                        </td>
                        <td className="font-mono text-xs sm:text-sm">
                          {invoice.transactionId}
                        </td>
                        <td>
                          {format(new Date(invoice.createdAt), "MMM dd, yyyy")}
                        </td>
                        <td className="font-bold text-primary">
                          ৳ {invoice.price}
                        </td>
                        <td>
                          <span className="badge badge-success gap-1">
                            <FaCheckCircle className="text-xs" />
                            Paid
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice._id} className="card bg-base-100 shadow-lg">
                    <div className="card-body p-4 sm:p-5">
                      {/* Book Name */}
                      <div className="flex items-start gap-2 mb-3">
                        <FaBook className="text-primary mt-1 shrink-0" />
                        <h3 className="font-bold text-base sm:text-lg text-gray-800">
                          {invoice.bookName}
                        </h3>
                      </div>

                      <div className="space-y-2 text-sm sm:text-base">
                        {/* Payment ID */}
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-gray-600 shrink-0">
                            Payment ID:
                          </span>
                          <span className="font-mono text-xs sm:text-sm text-right break-all">
                            {invoice.transactionId}
                          </span>
                        </div>

                        {/* Amount */}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-bold text-primary text-base sm:text-lg">
                            ৳ {invoice.price}
                          </span>
                        </div>

                        {/* Date */}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Date:</span>
                          <span className="font-semibold">
                            {format(
                              new Date(invoice.createdAt),
                              "MMM dd, yyyy"
                            )}
                          </span>
                        </div>

                        {/* Status */}
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Status:</span>
                          <span className="badge badge-success gap-1 text-xs sm:text-sm">
                            <FaCheckCircle className="text-xs" />
                            Paid
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Card */}
              <div className="card bg-linear-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 mt-6 sm:mt-8">
                <div className="card-body p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">
                        Total Payments
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {invoices.length}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">
                        Total Amount Paid
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-primary">
                        ৳{" "}
                        {invoices
                          .reduce((total, invoice) => total + invoice.price, 0)
                          .toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default Invoices;
