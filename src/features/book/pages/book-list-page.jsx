import { BookOpen } from "lucide-react";
import { useCallback, useMemo } from "react";

import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import BookCardSkeleton from "@/components/skeletons/book-card-skeleton";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { BookCard } from "@/features/book/components/book-card";
import { useBooks } from "@/features/book/hooks/use-books";
import useBookFilters, {
  resetFilters,
  setPage,
} from "@/store/use-book-filters";

import Section from "@/components/ui/section";
import BookFilters from "../components/book-filters";
import SearchResultsInfo from "../components/search-results-info";

function BookListPage() {
  const { category, search, sort, page, limit } = useBookFilters();
  const hasActiveFilters = Boolean(search || sort || category);

  const params = useMemo(
    () => ({ search, sort, category, page, limit }),
    [search, sort, category, page, limit],
  );

  const { data = {}, isLoading } = useBooks(params);

  const books = data?.data || [];
  const {
    totalPages = 0,
    totalDocs = 0,
    page: currentPage = 1,
  } = data?.pagination || {};

  const handlePageChange = useCallback((page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Section className="bg-muted/30">
      <Container>
        <Heading
          title="Explore Our Collection"
          subtitle="Discover amazing books from our extensive library collection"
        />

        <BookFilters />
        <SearchResultsInfo totalDocs={totalDocs} />

        {isLoading ? (
          <BookCardSkeleton length={10} />
        ) : totalDocs > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <EmptyState
            icon={BookOpen}
            title={hasActiveFilters ? "No books found" : "No books available"}
            description={
              hasActiveFilters
                ? "Try adjusting your filters or search terms."
                : "Check back later for new additions to our collection."
            }
            action={
              hasActiveFilters
                ? { label: "Reset Filters", onClick: resetFilters }
                : undefined
            }
          />
        )}
      </Container>
    </Section>
  );
}

export default BookListPage;
