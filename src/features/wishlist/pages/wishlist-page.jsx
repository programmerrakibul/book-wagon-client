import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

import { fetchWishlist } from "@/features/wishlist/services/wishlist.service";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function WishlistPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["wishlist", page],
    queryFn: () => fetchWishlist({ page, limit: 10 }),
  });

  const items = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) {
    return (
      <Container className="py-10 flex items-center justify-center min-h-[50vh]">
        <Spinner className="size-8" />
      </Container>
    );
  }

  if (!items.length) {
    return (
      <Container className="py-10">
        <Heading title="Wishlist" subtitle="Your favorite books" />
        <Empty className="mt-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Heart />
            </EmptyMedia>
            <EmptyTitle>Your wishlist is empty</EmptyTitle>
            <EmptyDescription>
              Browse our collection and add books you love to your wishlist.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <a href="/books">Browse Books</a>
            </Button>
          </EmptyContent>
        </Empty>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <Heading title="Wishlist" subtitle="Your favorite books" />

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead>Book Name</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const book = item.book ?? item;
              return (
                <TableRow key={item._id ?? book._id}>
                  <TableCell>
                    <img
                      src={book.image ?? book.coverImage ?? ""}
                      alt={book.title ?? "Book cover"}
                      className="size-10 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-[250px] truncate">
                    {book.title ?? "Unknown Book"}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="secondary">
                      {book.category ?? "General"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${Number(book.price ?? 0).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setSearchParams({ page: String(page - 1) })}
          >
            <ChevronLeft className="size-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setSearchParams({ page: String(page + 1) })}
          >
            Next
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </Container>
  );
}
