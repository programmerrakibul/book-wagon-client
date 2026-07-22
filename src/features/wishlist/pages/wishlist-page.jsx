import { Heart } from "lucide-react";
import { useCallback } from "react";
import { Link, useSearchParams } from "react-router";

import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { SkeletonLayout } from "@/components/shared/skeleton-layout";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist";
import { getPrice } from "@/utils/utils";

export default function WishlistPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useWishlist({ page, limit: 10 });

  const items = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const handlePageChange = useCallback(
    (p) => setSearchParams({ page: String(p) }),
    [setSearchParams],
  );

  const columns = [
    {
      key: "image",
      header: "Image",
      className: "w-16",
      cell: (row) => (
        <img
          src={row.bookId?.photoUrl ?? ""}
          alt={row.bookId?.name ?? "Book cover"}
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    {
      key: "name",
      header: "Book Name",
      cell: (row) => (
        <Link
          to={`/book-details/${row.bookId?._id}`}
          className="font-medium max-w-[250px] truncate block hover:underline"
        >
          {row.bookId?.name ?? "Unknown Book"}
        </Link>
      ),
    },
    {
      key: "author",
      header: "Author",
      className: "hidden sm:table-cell",
      cell: (row) => (
        <span className="text-muted-foreground">
          {row.bookId?.author ?? "—"}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      className: "text-right",
      cell: (row) => (
        <span className="font-medium flex items-center justify-end">
          ৳
          {getPrice({
            price: row.bookId?.price,
            discount: row.bookId?.discount,
            discountedPrice: row.bookId?.discountedPrice,
          })}
        </span>
      ),
    },
  ];

  const renderCard = (row) => (
    <Link
      to={`/book-details/${row.bookId?._id}`}
      className="flex items-center gap-4 rounded-xl border bg-card p-4 hover:bg-muted/50 transition-colors"
    >
      <img
        src={row.bookId?.photoUrl ?? ""}
        alt={row.bookId?.name ?? "Book cover"}
        className="h-16 w-12 shrink-0 rounded-md object-cover ring-1 ring-border"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {row.bookId?.name ?? "Unknown Book"}
        </p>
        <p className="text-xs text-muted-foreground">
          {row.bookId?.author ?? "—"}
        </p>
        <p className="mt-1 text-sm font-medium">
          ৳
          {getPrice({
            price: row.bookId?.price,
            discount: row.bookId?.discount,
            discountedPrice: row.bookId?.discountedPrice,
          })}
        </p>
      </div>
    </Link>
  );

  if (isLoading) {
    return (
      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="Wishlist" subtitle="Your favorite books" />
        <div className="mt-6">
          <SkeletonLayout variant="table" count={10} />
        </div>
      </Container>
    );
  }

  if (!items.length) {
    return (
      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="Wishlist" subtitle="Your favorite books" />
        <div className="mt-8">
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Browse our collection and add books you love to your wishlist."
            action={{ label: "Browse Books", to: "/books" }}
          />
        </div>
      </Container>
    );
  }

  return (
    <>
      <title>Wishlist | BookWagon</title>

      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="Wishlist" subtitle="Your favorite books" />

        <div className="mt-6">
          <DataTable columns={columns} data={items} renderCard={renderCard} />
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
}
