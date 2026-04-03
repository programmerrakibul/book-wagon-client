import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FaFileInvoice, FaCheckCircle, FaBook } from "react-icons/fa";
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
import TablePaginationComponent from "../../../components/TablePaginationComponent/TablePaginationComponent";
import { useSearchParams } from "react-router";

const Invoices = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const limit = searchParams.get("limit") || 10;
  const page = searchParams.get("page") || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["invoices", "paid", user.email],
    queryFn: async () => {
      const { data } = await secureAxios.get("/payments", {
        params: {
          page,
          limit,
        },
      });
      return data || {};
    },
  });

  if (isLoading) {
    return <Loading message="Loading your invoices..." />;
  }

  const invoices = data?.data || [];
  const { totalDocs } = data?.pagination || {};

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

          {totalDocs === 0 ? (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center py-12 sm:py-16">
                <FaFileInvoice className="text-6xl sm:text-7xl  mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-semibold  mb-2">
                  No Invoices Yet
                </h3>
                <p className="text-sm sm:text-base ">
                  You haven't made any payments yet.
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
                        Payment ID
                      </TableCell>
                      <TableCell className="font-bold! text-base!">
                        Payment Date
                      </TableCell>
                      <TableCell className="font-bold! text-base!">
                        Amount
                      </TableCell>
                      <TableCell className="font-bold! text-base!">
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow
                        key={invoice._id}
                        className="hover:bg-base-200 transition-colors"
                      >
                        <TableCell className="min-w-20!">
                          <span className="font-semibold  text-sm lg:text-base">
                            {invoice.bookName}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-xs sm:text-sm ">
                            {invoice.transactionId}
                          </span>
                        </TableCell>
                        <TableCell className=" text-sm lg:text-base text-nowrap">
                          {format(new Date(invoice.createdAt), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="font-bold text-primary text-sm lg:text-base">
                          ৳ {invoice.price}
                        </TableCell>
                        <TableCell>
                          <span className="badge badge-success gap-1 badge-sm">
                            <FaCheckCircle className="text-xs" />
                            Paid
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <TablePaginationComponent total={totalDocs} />
              </TableContainer>

              {/* Summary Card */}
              <div className="card bg-linear-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 mt-6 sm:mt-8">
                <div className="card-body p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <p className="text-xs sm:text-sm  mb-1">Total Payments</p>
                      <p className="text-2xl sm:text-3xl font-bold ">
                        {invoices.length}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs sm:text-sm  mb-1">
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
