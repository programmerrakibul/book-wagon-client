import { useQuery } from "@tanstack/react-query";
import { FaBook, FaTrash } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Container from "../../shared/Container/Container";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { getAlert } from "../../../utilities/getAlert";
import { toast } from "sonner";
import Swal from "sweetalert2";
import Heading from "../../../components/Heading/Heading";
import Loading from "../../../components/Loading/Loading";
import useAuth from "../../../hooks/useAuth";
import { useSearchParams } from "react-router";
import TablePaginationComponent from "../../../components/TablePaginationComponent/TablePaginationComponent";

const ManageBooks = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "manage-books",
      "admin",
      user.email,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const { data } = await secureAxios.get("/books", {
        params: {
          email: user.email,
          page,
          limit,
          search,
          sortBy,
          sortOrder,
        },
      });

      return data || {};
    },
  });

  const handleStatusChange = async (bookId, status) => {
    try {
      const { data } = await secureAxios.patch(`/books/${bookId}`, { status });

      if (data.success) {
        refetch();
        getAlert({ title: `Book status updated with ${status}` });
      } else {
        getAlert({
          title:
            data.message || "Failed to update book status. Please try again.",
          icon: "error",
        });
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message;
      toast.error(errorMessage);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const { data } = await secureAxios.delete(`/books/${id}`);

        if (data.success) {
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "Book data deleted successfully.",
            icon: "success",
          });
        } else {
          getAlert({
            title: data.message || "Failed to delete book. Please try again.",
            icon: "error",
          });
        }
      }
    } catch {
      toast.error("Book delete failed! Please try again.");
    }
  };

  if (isLoading) {
    return <Loading message="Books data is loading..." />;
  }

  const books = data?.data || [];
  const { totalDocs } = data?.pagination || {};

  return (
    <>
      <title>My Books - BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          {/* Header */}
          <Heading
            title={
              <>
                <FaBook className="text-primary mr-2 inline-block" />
                Manage Books
              </>
            }
            subtitle="Manage all librarians book collection"
          />

          {/* Books Table */}
          {totalDocs > 0 ? (
            <>
              <TableContainer component={Paper} className="shadow-lg">
                <Table>
                  <TableHead>
                    <TableRow className="bg-primary/10">
                      <TableCell>#</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell className="min-w-[170px]">Book Name</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell className="min-w-40">Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {books.map((book, index) => (
                      <TableRow
                        key={book._id}
                        className="hover:bg-base-200 transition-colors"
                      >
                        <TableCell>
                          <span className="font-semibold">{index + 1}</span>
                        </TableCell>
                        <TableCell>
                          <img
                            src={book.bookImage}
                            alt={book.bookName}
                            className="w-12 h-16 object-cover rounded shadow"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-sm lg:text-base">
                            {book.bookName}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm lg:text-base">
                          {book.author}
                        </TableCell>
                        <TableCell>
                          <Select
                            variant="standard"
                            labelId="change-book-status-label"
                            id="change-book-status"
                            value={book.status}
                            color="primary"
                            label="Age"
                            size="small"
                            className="capitalize"
                            onChange={(e) =>
                              handleStatusChange(book._id, e.target.value)
                            }
                          >
                            {["published", "unpublished"].map((status) => (
                              <MenuItem
                                key={status}
                                value={status}
                                className="capitalize"
                              >
                                {status}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            onClick={() => handleDeleteBook(book._id)}
                            startIcon={<FaTrash />}
                            color="error"
                            aria-label="Delete a book"
                            size="small"
                          >
                            Delete
                          </Button>
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
              <div className="card-body text-center py-12">
                <FaBook className="text-6xl  mx-auto mb-4" />
                <h3 className="text-xl font-semibold  mb-2">No Books Found</h3>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default ManageBooks;
