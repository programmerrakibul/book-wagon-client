import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { Pagination, Box } from "@mui/material";
import usePublicAxios from "../../hooks/usePublicAxios";
import Container from "../shared/Container/Container";
import ActionSpinner from "../../components/ActionSpinner/ActionSpinner";
import BookCard from "../../components/BookCard/BookCard";
import Heading from "../../components/Heading/Heading";

const Books = () => {
  const publicAxios = usePublicAxios();
  const [page, setPage] = useState(1);
  const booksPerPage = 10;

  const { data, isPending } = useQuery({
    queryKey: ["all-books", page],
    queryFn: async () => {
      const { data } = await publicAxios.get("/books", {
        params: {
          fields: "bookName,bookImage,author,price,quantity",
          limit: booksPerPage,
          skip: (page - 1) * booksPerPage,
        },
      });
      return data;
    },
  });

  const books = data?.books || [];
  const totalBooks = data?.total || 0;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ActionSpinner />
      </div>
    );
  }

  return (
    <>
      <title>Explore Our Awesome Books - BookWagon</title>

      <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5">
        <Container>
          {/* Header */}
          <Heading
            title="Explore Our Collection"
            subtitle="Discover amazing books from our extensive library collection"
          />

          {/* Books Grid */}
          {books.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: { xs: 6, sm: 8, lg: 10 },
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        fontWeight: 500,
                        "&.Mui-selected": {
                          fontWeight: 700,
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </>
          ) : (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center py-12 sm:py-16 lg:py-20">
                <FaBook className="text-6xl sm:text-7xl lg:text-8xl text-gray-300 mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600 mb-2 sm:mb-3">
                  No Books Available
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-500">
                  Check back later for new additions to our collection.
                </p>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default Books;
