import { useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { BookCard } from "@/components/ui/book-card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useBooks } from "@/features/books/hooks/use-books";
import { useCategories } from "@/features/books/hooks/use-categories";
import useBookFilters, {
  setSearch,
  setSort,
  setCategory,
  setPage,
} from "@/store/use-book-filters";
import { BookOpen } from "lucide-react";
import { getCategories } from "@/features/books/services/categories.service";

function BookListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-xl border p-0">
          <Skeleton className="aspect-[3/4] w-full rounded-none rounded-t-xl" />
          <div className="flex flex-col gap-2 px-4 pb-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function BookListPage() {
  const { category, search, sort, page, limit } = useBookFilters();
  const { data: categories = [] } = useCategories();

  const params = useMemo(
    () => ({ search, sort, category, page, limit }),
    [search, sort, category, page, limit]
  );

  const { data = {}, isLoading } = useBooks(params);

  const books = data?.data || [];
  const { totalPages = 0, totalDocs = 0, page: currentPage = 1 } =
    data?.pagination || {};

  const handlePageChange = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-muted/30 py-8 sm:py-12 lg:py-16">
      <Container>
        <Heading
          title="Explore Our Collection"
          subtitle="Discover amazing books from our extensive library collection"
        />

        <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value.trim())}
              placeholder="Search books by title, author, or category..."
              className="pl-9"
            />
          </div>

          <Select
            value={category}
            onValueChange={(val) => setCategory(val === "all" ? "" : val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(val) => setSort(val === "default" ? "" : val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A-Z</SelectItem>
              <SelectItem value="name-desc">Name: Z-A</SelectItem>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="createdAt-asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <BookListSkeleton />
        ) : totalDocs > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Books pagination"
                className="mt-8 flex items-center justify-center gap-3"
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                  <ChevronRight />
                </Button>
              </nav>
            )}
          </>
        ) : (
          <Empty>
            <EmptyMedia variant="icon">
              <BookOpen />
            </EmptyMedia>
            <EmptyTitle>No books available</EmptyTitle>
            <EmptyDescription>
              Check back later for new additions to our collection.
            </EmptyDescription>
          </Empty>
        )}
      </Container>
    </section>
  );
}

export default BookListPage;
