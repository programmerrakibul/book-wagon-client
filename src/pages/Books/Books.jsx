import BookCardSkeleton from "@/components/skeletons/book-card-skeleton";
import BookCard from "@/components/ui/book-card";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import { useBooks } from "@/hooks/use-books";
import SortComponent from "@/pages/books/sort-component";
import { setPage, setSearch } from "@/stores/use-book-filters";
import { Box, Pagination } from "@mui/material";
import { FaBook, FaSearch } from "react-icons/fa";
import CategoriesComponent from "./categories-component";

const Books = () => {
  const { data = {}, isLoading } = useBooks();

  const books = data?.data || [];
  const { totalPages, totalDocs, ...pagination } = data?.pagination || {};

  const handlePageChange = (_event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const value = e.target.value.trim();

    setSearch(value);
  };

  return (
    <>
      <title>Explore Our Awesome Books | BookWagon</title>

      <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5">
        <Container>
          {/* Header */}
          <Heading
            title="Explore Our Collection"
            subtitle="Discover amazing books from our extensive library collection"
          />

          {/* Search and Sort Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 sm:mb-8 lg:mb-10">
            {/* Search Input */}
            <div className="col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base" />
                <input
                  name="search"
                  type="search"
                  onChangeCapture={handleSearch}
                  placeholder="Search books by title, author, or category..."
                  className="input input-bordered w-full pl-11 pr-4 text-sm sm:text-base h-12 sm:h-14 focus:outline-primary"
                />
              </div>
            </div>

            {/* Filter Dropdown */}
            <CategoriesComponent />

            {/* Sort Dropdown */}
            <SortComponent />
          </div>

          {/* Books Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              <BookCardSkeleton length={10} />
            </div>
          ) : totalDocs > 0 ? (
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
                    page={pagination.page}
                    onChange={handlePageChange}
                    size="large"
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
