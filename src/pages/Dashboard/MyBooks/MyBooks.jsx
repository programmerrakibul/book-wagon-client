import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { FaEdit, FaBook } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import Container from "../../shared/Container/Container";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { getAlert } from "../../../utilities/getAlert";
import { toast } from "sonner";
import Button from "../../../components/Button/Button";
import Heading from "../../../components/Heading/Heading";
import Loading from "../../../components/Loading/Loading";
import TablePaginationComponent from "../../../components/TablePaginationComponent/TablePaginationComponent";

const MyBooks = () => {
  const navigate = useNavigate();
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
      "my-books",
      "librarian",
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
        toast.error(
          data.message || "Failed to update book status. Please try again.",
        );
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message;
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return <Loading message="Loading your books..." />;
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
                <FaBook className="text-primary inline-block mr-2" />
                My Books
              </>
            }
            subtitle="Manage your book collection"
          />

          {/* Books Table */}
          {totalDocs > 0 ? (
            <>
              <TableContainer component={Paper} className="shadow-lg!">
                <Table>
                  <TableHead>
                    <TableRow className="bg-primary/10">
                      <TableCell className="font-bold! text-base!">#</TableCell>
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
                          <span className="font-semibold ">{index + 1}</span>
                        </TableCell>
                        <TableCell>
                          <img
                            src={book.bookImage}
                            alt={book.bookName}
                            className="w-12 h-16 object-cover rounded shadow"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="font-medium  text-sm lg:text-base">
                            {book.bookName}
                          </span>
                        </TableCell>
                        <TableCell className=" text-sm lg:text-base">
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

                <TablePaginationComponent total={totalDocs} />
              </TableContainer>
            </>
          ) : (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center py-12">
                <FaBook className="text-6xl  mx-auto mb-4" />
                <h3 className="text-xl font-semibold  mb-2">No Books Found</h3>
                <p className=" mb-4">You haven't added any books yet.</p>
                <Button handleClick={() => navigate("/dashboard/add-book")}>
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
