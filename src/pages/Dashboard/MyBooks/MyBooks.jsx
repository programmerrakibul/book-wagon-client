import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { FaEdit, FaBook } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Container from "../../shared/Container/Container";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { getAlert } from "../../../utilities/getAlert";
import { toast } from "sonner";
import Button from "../../../components/Button/Button";
import Heading from "../../../components/Heading/Heading";
import Loading from "../../../components/Loading/Loading";

const MyBooks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const {
    data: books,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books", "librarian", user.email],
    queryFn: async () => {
      const { data } = await secureAxios.get("/books", {
        params: {
          email: user.email,
          role: "librarian",
        },
      });

      return data?.books;
    },
  });

  const handleStatusChange = async (bookId, status) => {
    try {
      const { data } = await secureAxios.patch(`/books/${bookId}`, { status });

      if (data.modifiedCount) {
        refetch();
        getAlert({ title: `Book status updated with ${status}` });
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message;
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return <Loading message="Loading your books..." />;
  }

  return (
    <>
      <title>My Books - BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          {/* Header */}
          <Heading
            title={
              <>
                <FaBook className="text-primary inline-block mr-2" />
                My Books
              </>
            }
            subtitle="Manage your book collection"
          />

          {/* Books Table */}
          {books.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <TableContainer component={Paper} className="shadow-lg!">
                  <Table>
                    <TableHead>
                      <TableRow className="bg-primary/10">
                        <TableCell className="font-bold! text-base!">
                          #
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Image
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Book Name
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Author
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Status
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
                      {books.map((book, index) => (
                        <TableRow
                          key={book._id}
                          className="hover:bg-base-200 transition-colors"
                        >
                          <TableCell>
                            <span className="font-semibold text-gray-800">
                              {index + 1}
                            </span>
                          </TableCell>
                          <TableCell>
                            <img
                              src={book.bookImage}
                              alt={book.bookName}
                              className="w-12 h-16 object-cover rounded shadow"
                            />
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-gray-800 text-sm lg:text-base">
                              {book.bookName}
                            </span>
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm lg:text-base">
                            {book.author}
                          </TableCell>
                          <TableCell>
                            <select
                              value={book.status}
                              onChange={(e) =>
                                handleStatusChange(book._id, e.target.value)
                              }
                              className={`select select-bordered select-sm ${
                                book.status === "published"
                                  ? "select-success"
                                  : "select-warning"
                              }`}
                            >
                              <option value="published">Published</option>
                              <option value="unpublished">Unpublished</option>
                            </select>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              handleClick={() =>
                                navigate(`/dashboard/edit-book/${book._id}`)
                              }
                              className="btn-sm!"
                            >
                              <FaEdit />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden py-4 space-y-4">
                {books.map((book, index) => (
                  <div
                    key={book._id}
                    className="card bg-base-100 border border-primary/20 shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="card-body p-4">
                      <div className="flex gap-4">
                        {/* Book Image */}
                        <div className="avatar shrink-0">
                          <div className="w-20 h-28 rounded">
                            <img
                              src={book.bookImage}
                              alt={book.bookName}
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {/* Book Info */}
                        <div className="flex-1 min-w-0">
                          <div className="badge badge-neutral badge-sm mb-2">
                            #{index + 1}
                          </div>
                          <h3 className="font-bold text-base mb-1 truncate">
                            {book.bookName}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 truncate">
                            by {book.author}
                          </p>

                          {/* Status Select */}
                          <select
                            value={book.status}
                            onChange={(e) =>
                              handleStatusChange(book._id, e.target.value)
                            }
                            className="select select-bordered select-sm w-full mb-3"
                          >
                            <option value="published">Published</option>
                            <option value="unpublished">Unpublished</option>
                          </select>

                          {/* Edit Button */}
                          <Button
                            handleClick={() =>
                              navigate(`/dashboard/edit-book/${book._id}`)
                            }
                            className="btn-sm!"
                          >
                            <FaEdit />
                            Edit Book
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center py-12">
                <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Books Found
                </h3>
                <p className="text-gray-500 mb-4">
                  You haven't added any books yet.
                </p>
                <Button
                  handleClick={() => navigate("/dashboard/add-book")}
                  className="btn btn-primary mx-auto"
                >
                  Add Your First Book
                </Button>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default MyBooks;
