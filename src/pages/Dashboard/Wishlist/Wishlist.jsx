import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaHeart, FaBook } from "react-icons/fa";
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
import Container from "../../shared/Container/Container";
import Heading from "../../../components/Heading/Heading";

const Wishlist = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["wishlist-books", user.email],
    queryFn: async () => {
      const { data } = await secureAxios.get(`/wishlist/${user.email}/books`);
      return data?.books || [];
    },
  });

  if (isLoading) {
    return <Loading message="Loading your wishlist..." />;
  }

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
              {/* Desktop Table View */}
              <div className="hidden md:block">
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
                </TableContainer>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {books.map((book) => (
                  <div
                    key={book._id}
                    className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="card-body p-4">
                      <div className="flex gap-4">
                        {/* Book Image */}
                        <img
                          src={book.bookImage}
                          alt={book.bookName}
                          className="w-20 h-28 object-cover rounded shadow"
                        />

                        {/* Book Info */}
                        <div className="flex-1">
                          <h3 className="font-bold text-lg  mb-2 line-clamp-2">
                            {book.bookName}
                          </h3>
                          <span className="badge badge-primary badge-sm mb-3">
                            {book.category}
                          </span>
                          <p className="text-xl font-bold text-primary">
                            ৳ {book.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
