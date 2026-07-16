import { changeBookStatus } from "@/api/book";
import { queryClient } from "@/App";
import Heading from "@/components/Heading/Heading";
import Loading from "@/components/Loading/Loading";
import TablePaginationComponent from "@/components/TablePaginationComponent/TablePaginationComponent";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import useBooks from "@/hooks/use-books";
import { getAlert } from "@/utils/getAlert";
import {
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaBook, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const MyBooks = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useBooks(true);

  const handleStatusChange = async (bookId, status) => {
    try {
      const data = await changeBookStatus(bookId, status);

      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["books"] });
        getAlert({ title: `Book status updated with ${status}` });
        return;
      }

      throw new Error(data.message || "Failed to update book status.");
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
                    {books.map((book) => (
                      <TableRow
                        key={book._id}
                        className="hover:bg-base-200 transition-colors"
                      >
                        <TableCell>
                          <img
                            src={book.photoUrl}
                            alt={book.name}
                            className="w-12 h-16 object-cover rounded shadow"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="font-medium  text-sm lg:text-base">
                            {book.name}
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
                            label="Status"
                            size="small"
                            onChange={(e) =>
                              handleStatusChange(book._id, e.target.value)
                            }
                          >
                            {["PUBLISHED", "UNPUBLISHED"].map((status) => (
                              <MenuItem key={status} value={status}>
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
