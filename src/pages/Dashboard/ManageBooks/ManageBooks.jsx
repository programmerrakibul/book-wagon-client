import { useQuery } from "@tanstack/react-query";
import { FaBook, FaTrash } from "react-icons/fa";
import Container from "../../shared/Container/Container";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { getAlert } from "../../../utilities/getAlert";
import { toast } from "sonner";
import Swal from "sweetalert2";
import Heading from "../../../components/Heading/Heading";
import Loading from "../../../components/Loading/Loading";

const ManageBooks = () => {
  const secureAxios = useSecureAxios();
  const {
    data: books,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-books"],
    queryFn: async () => {
      const { data } = await secureAxios.get("/books");

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

        if (data.deletedCount) {
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "Book data deleted successfully.",
            icon: "success",
          });
        }

        console.log(data);
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message;
      toast.error(errorMessage);
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loading message="Books is loading..." />;
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
                <FaBook className="text-primary mr-2 inline-block" />
                Manage Books
              </>
            }
            subtitle="Manage all librarians book collection"
          />

          {/* Books Table */}
          {books.length > 0 ? (
            <div className="card bg-base-100 shadow-xl overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra">
                  <thead className="bg-linear-to-r from-primary/10 to-secondary/10">
                    <tr>
                      <th className="text-sm lg:text-base">#</th>
                      <th className="text-sm lg:text-base">Image</th>
                      <th className="text-sm lg:text-base">Book Name</th>
                      <th className="text-sm lg:text-base">Author</th>
                      <th className="text-sm lg:text-base">Status</th>
                      <th className="text-sm lg:text-base text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book, index) => (
                      <tr key={book._id} className="hover">
                        <td className="font-semibold">{index + 1}</td>
                        <td>
                          <div className="avatar">
                            <div className="w-12 h-16 rounded">
                              <img
                                src={book.bookImage}
                                alt={book.bookName}
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="font-medium text-sm lg:text-base">
                          {book.bookName}
                        </td>
                        <td className="text-sm lg:text-base text-gray-600">
                          {book.author}
                        </td>
                        <td>
                          <select
                            value={book.status}
                            onChange={(e) =>
                              handleStatusChange(book._id, e.target.value)
                            }
                            className={`select select-bordered select-xs sm:select-sm w-full max-w-xs ${
                              book.status === "published"
                                ? "select-success"
                                : "select-warning"
                            }`}
                          >
                            <option value="published">Published</option>
                            <option value="unpublished">Unpublished</option>
                          </select>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => handleDeleteBook(book._id)}
                            className="btn btn-error btn-xs sm:btn-sm gap-1"
                          >
                            <FaTrash />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden p-4 space-y-4">
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
                          <button
                            onClick={() => handleDeleteBook(book._id)}
                            className="btn btn-error btn-sm gap-2 w-full"
                          >
                            <FaTrash />
                            Delete Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center py-12">
                <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Books Found
                </h3>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default ManageBooks;
