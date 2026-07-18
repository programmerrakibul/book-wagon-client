import { ArrowLeft, Heart, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { BookCoverCard } from "@/features/book/components/book-cover-card";
import { BookDescription } from "@/features/book/components/book-description";
import { BookInfoGrid } from "@/features/book/components/book-info-grid";
import { BookPriceCard } from "@/features/book/components/book-price-card";
import { OrderModal } from "@/features/book/components/order-modal";
import { ReviewSection } from "@/features/book/components/review-section";
import { useBook } from "@/features/book/hooks/use-books";
import {
  useIsFavorite,
  useToggleFavorite,
} from "@/features/book/hooks/use-favorites";
import useAuthStore from "@/store/use-auth-store";

function DetailsSkeleton() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
      <div className="flex-1 lg:max-w-md">
        <Skeleton className="aspect-3/4 w-full rounded-xl" />
      </div>
      <div className="flex-1 space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [orderOpen, setOrderOpen] = useState(false);

  const { data: book, isLoading: bookLoading } = useBook(id);
  const { data: isFavorite } = useIsFavorite(id, user?.email);
  const toggleFavorite = useToggleFavorite(id);

  if (bookLoading) {
    return (
      <section className="bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5 py-8 sm:py-12 lg:py-16">
        <Container>
          <DetailsSkeleton />
        </Container>
      </section>
    );
  }

  if (!book) {
    return (
      <section className="py-8 sm:py-12 lg:py-16">
        <Container>
          <p className="text-center text-muted-foreground">Book not found.</p>
        </Container>
      </section>
    );
  }

  const isLibrarian = book.librarianId?.email === user?.email;

  return (
    <>
      <title>{`${book.name || "Book Details"} | BookWagon`}</title>

      <section className="bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5 py-8 sm:py-12 lg:py-16">
        <Container>
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
            Go Back
          </Button>

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
            <div className="flex-1 lg:sticky lg:top-24 lg:max-w-md lg:self-start">
              <BookCoverCard
                photoUrl={book.photoUrl}
                name={book.name}
                stock={book.stock}
              />
            </div>

            <div className="flex-1 space-y-6 sm:space-y-8">
              <div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <h1 className="flex-1 text-2xl font-bold sm:text-3xl lg:text-4xl xl:text-5xl">
                    {book.name}
                  </h1>
                  {!isLibrarian && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite.mutate()}
                      disabled={toggleFavorite.isPending}
                    >
                      <Heart
                        className={`size-5 ${
                          isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2 text-base sm:text-lg">
                  <User className="size-4 text-primary" />
                  <span className="font-medium">by {book.author}</span>
                </div>
              </div>

              <BookPriceCard
                price={book.price}
                discountedPrice={book.discountedPrice}
                discount={book.discount}
              />

              <BookInfoGrid book={book} />

              <BookDescription description={book.description} />

              {!isLibrarian && (
                <Button
                  className="w-full"
                  onClick={() => setOrderOpen(true)}
                  disabled={book.stock === 0}
                >
                  <ShoppingCart />
                  {book.stock > 0 ? "Order Now" : "Out of Stock"}
                </Button>
              )}
            </div>
          </div>

          <Separator className="my-12 sm:my-16" />

          <ReviewSection bookId={id} bookName={book.name} />
        </Container>
      </section>

      <OrderModal open={orderOpen} onOpenChange={setOrderOpen} book={book} />
    </>
  );
}

export default BookDetailsPage;
