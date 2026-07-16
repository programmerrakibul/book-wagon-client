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
import { FaBook, FaHeart } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";
import Button from "../../../components/ui/button";
import Container from "../../../components/ui/container";
import Heading from "../../../components/ui/heading";
import Loading from "../../../components/ui/loading";
import TablePaginationComponent from "../../../components/ui/table-pagination";
import useSecureAxios from "../../../hooks/useSecureAxios";

const Wishlist = () => {
  const user = useAuthStore((s) => s.user);
  const secureAxios = useSecureAxios();
  const [searchParams] = useSearchParams();

  const limit = searchParams.get("limit") || 10;
  const page = searchParams.get("page") || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["favorite-books", user.email, page, limit],
    queryFn: async () => {
      const { data } = await secureAxios.get("/favorites/books", {
        params: {
          page,
          limit,
        },
      });
      return data || {};
    },
  });

  if (isLoading) {
    return <Loading message="Loading your wishlist..." />;
  }

  const books = data?.data || [];
  const { totalDocs } = data?.pagination || {};

  return (
    <>
      <title>Your Wishlist - BookWagon</title>

      <section className="py-8 sm:py-12 lg:py-16">
        <Container>
          {/* Header */}
          <Heading
            title="My Wishlist"
            subtitle={
              books.length > 0
                ? `You have ${books.length} book${
                    books.length > 1 ? "s" : ""
                  } in your wishlist`
                : "Your wishlist is empty"
            }
          />

          {books.length > 0 ? (
            <>
              <TableContainer component={Paper} className="shadow-lg">
                <Table>
                  <TableHead>
                    <TableRow className="bg-primary/10">
                      <TableCell className="font-bold text-base">
                        Image
                      </TableCell>
                      <TableCell className="font-bold text-base">
                        Book Name
                      </TableCell>
                      <TableCell className="font-bold text-base">
                        Category
                      </TableCell>
                      <TableCell className="font-bold text-base">
                        Price
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {books.map((book) => (
                      <TableRow
                        key={book._id}
                        className="hover:bg-base-200 transition-colors"
                      >
                        <TableCell>
                          <img
                            src={book.bookImage}
                            alt={book.bookName}
                            className="w-16 h-20 object-cover rounded shadow"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold  text-base">
                            {book.bookName}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="badge badge-primary badge-md">
                            {book.category}
                          </span>
                        </TableCell>
                        <TableCell className="font-bold text-primary text-lg">
                          ৳ {book.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <TablePaginationComponent total={totalDocs} />
              </TableContainer>
            </>
          ) : (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center py-12 sm:py-16 lg:py-20">
                <FaHeart className="text-6xl sm:text-7xl lg:text-8xl  mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold  mb-2 sm:mb-3">
                  Your Wishlist is Empty
                </h3>
                <p className="text-sm sm:text-base lg:text-lg  mb-6 sm:mb-8">
                  Start adding books you love to your wishlist!
                </p>
                <Link to="/books">
                  <Button>
                    <FaBook />
                    Browse Books
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default Wishlist;
