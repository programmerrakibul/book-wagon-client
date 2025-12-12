import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaBook, FaSearch, FaSort } from "react-icons/fa";
import { Pagination, Box } from "@mui/material";
import usePublicAxios from "../../hooks/usePublicAxios";
import Container from "../shared/Container/Container";
import BookCard from "../../components/BookCard/BookCard";
import Heading from "../../components/Heading/Heading";
import Loading from "../../components/Loading/Loading";

const Books = () => {
  const publicAxios = usePublicAxios();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("");
  const booksPerPage = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-books", page, searchQuery, sort],
    queryFn: async () => {
      const { data } = await publicAxios.get("/books", {
        params: {
          fields: "bookName,bookImage,author,price,quantity",
          limit: booksPerPage,
          skip: (page - 1) * booksPerPage,
          search: searchQuery,
          sortBy: sort.split("-")[0],
          sortOrder: sort.split("-")[1],
        },
      });
      return data;
    },
  });

  const books = data?.books || [];
  const totalBooks = data?.total || 0;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const handlePageChange = (_event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e) => {
    refetch();
    setSearchQuery(e.target.value.trim());
    setPage(1);
  };

  const handleSort = (e) => {
    const sort = e.target.value;
    setSort(sort);
    refetch();
    setPage(1);
  };

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

          {/* Search and Sort Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8 lg:mb-10">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base" />
                <input
                  type="text"
                  placeholder="Search books by title, author, or category..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="input input-bordered w-full pl-11 pr-4 text-sm sm:text-base h-12 sm:h-14 focus:outline-primary"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:w-64">
              <div className="relative">
                <FaSort className="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base pointer-events-none z-10" />
                <select
                  value={sort}
                  onChange={handleSort}
                  className="select select-bordered w-full pl-11 pr-4 text-sm sm:text-base h-12 sm:h-14 focus:outline-primary appearance-none"
                >
                  <option value="">Sort By</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="bookName-asc">Name: A to Z</option>
                  <option value="bookName-desc">Name: Z to A</option>
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Books Grid */}
          {isLoading ? (
            <Loading message="Books is loading..." />
          ) : books.length > 0 ? (
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
                <FaBook className="text-6xl sm:text-7xl lg:text-8xl mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3">
                  No Books Available
                </h3>
                <p className="text-sm sm:text-base lg:text-lg">
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
