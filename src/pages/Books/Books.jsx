import { useQuery } from "@tanstack/react-query";
import { FaBook, FaSearch, FaSort } from "react-icons/fa";
import { Pagination, Box } from "@mui/material";
import usePublicAxios from "../../hooks/usePublicAxios";
import Container from "../shared/Container/Container";
import BookCard from "../../components/BookCard/BookCard";
import Heading from "../../components/Heading/Heading";
import BookCardSkeleton from "../../components/skeletons/BookCardSkeleton";
import { useSearchParams } from "react-router";

const Books = () => {
  const publicAxios = usePublicAxios();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";
  const category = searchParams.get("category") || "";

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-books", page, search, sortBy, sortOrder, category],
    queryFn: async () => {
      const { data = {} } = await publicAxios.get("/books", {
        params: {
          fields: "bookName,bookImage,author,price,quantity,description",
          page,
          search,
          sortBy,
          sortOrder,
          category,
        },
      });

      return data;
    },
  });

  const { data: categories = [], isLoading: categoryLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await publicAxios.get("/books/categories");

      if (!data.success) {
        return [];
      }

      return data.data;
    },
  });

  const books = data?.data || [];
  const { totalPages, totalDocs, ...pagination } = data?.pagination || {};

  const handlePageChange = (_event, value) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("page", value);
        return newParams;
      },
      { replace: true },
    );

    refetch();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e) => {
    const value = e.target.value.trim();

    console.log(value);

    value && setSearchParams({ search: value, page: "1" }, { replace: true });

    refetch();
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value.trim();

    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);

        newParams.set("category", value);
        newParams.set("page", "1");

        if (!value) newParams.delete("category");

        return newParams;
      },
      { replace: true },
    );

    refetch();
  };

  const handleSort = (e) => {
    const sort = e.target.value;

    const [sortBy, sortOrder] = sort.split("-");

    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);

        newParams.set("sortBy", sortBy);
        newParams.set("sortOrder", sortOrder);
        newParams.set("page", "1");

        if (!sortBy) newParams.delete("sortBy");
        if (!sortOrder) newParams.delete("sortOrder");

        return newParams;
      },
      { replace: true },
    );

    refetch();
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 sm:mb-8 lg:mb-10">
            {/* Search Input */}
            <div className="col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base" />
                <input
                  type="text"
                  placeholder="Search books by title, author, or category..."
                  value={search}
                  onChange={handleSearch}
                  className="input input-bordered w-full pl-11 pr-4 text-sm sm:text-base h-12 sm:h-14 focus:outline-primary"
                />
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="col-span-1">
              <div className="relative">
                <FaSort className="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base pointer-events-none z-10" />
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  disabled={categoryLoading}
                  className="select select-bordered w-full pl-11 pr-4 text-sm sm:text-base h-12 sm:h-14 focus:outline-primary appearance-none"
                >
                  <option value="">Filter By</option>

                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      Filter By: {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="col-span-1">
              <div className="relative">
                <FaSort className="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base pointer-events-none z-10" />
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={handleSort}
                  className="select select-bordered w-full pl-11 pr-4 text-sm sm:text-base h-12 sm:h-14 focus:outline-primary appearance-none"
                >
                  <option value="-">Sort By</option>
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
